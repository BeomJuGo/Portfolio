'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ColorBendsProps {
  colors?: string[]
  rotation?: number
  speed?: number
  scale?: number
  frequency?: number
  warpStrength?: number
  mouseInfluence?: number
  parallax?: number
  noise?: number
  transparent?: boolean
  autoRotate?: number
  color?: string
}

export default function ColorBends({
  colors = ["#ff5c7a", "#8a5cff", "#00ffd1"],
  rotation = 0,
  speed = 0.2,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 1,
  parallax = 0.5,
  noise = 0.1,
  transparent = true,
  autoRotate = 0,
  color = "",
}: ColorBendsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: transparent,
      antialias: true 
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, transparent ? 0 : 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Convert hex colors to RGB
    const colorArray = colors.map(hex => {
      const color = new THREE.Color(hex)
      return [color.r, color.g, color.b]
    })

    // Create shader material
    const vertexShader = `
      uniform float u_time;
      uniform float u_speed;
      uniform float u_frequency;
      uniform float u_warpStrength;
      uniform float u_noise;
      uniform vec2 u_mouse;
      uniform float u_mouseInfluence;
      uniform float u_scale;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        
        // Apply noise
        float n = noise(pos.xy * u_frequency + u_time * u_speed) * u_noise;
        pos.z += n * u_warpStrength;
        
        // Mouse influence
        vec2 mouseOffset = (u_mouse * u_mouseInfluence) * 0.5;
        pos.xy += mouseOffset;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * u_scale, 1.0);
      }
    `

    const fragmentShader = `
      uniform float u_time;
      uniform float u_speed;
      uniform float u_frequency;
      uniform vec3 u_colors[${colors.length}];
      uniform float u_parallax;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vec2 uv = vUv;
        
        // Create color gradient based on position and time
        float t = u_time * u_speed;
        float gradient = sin(uv.x * ${frequency} + uv.y * ${frequency} + t) * 0.5 + 0.5;
        
        // Mix colors based on gradient
        vec3 color1 = u_colors[0];
        vec3 color2 = u_colors[1];
        vec3 color3 = u_colors[${colors.length > 2 ? 2 : 1}];
        
        vec3 finalColor;
        if (gradient < 0.5) {
          finalColor = mix(color1, color2, gradient * 2.0);
        } else {
          finalColor = mix(color2, color3, (gradient - 0.5) * 2.0);
        }
        
        // Add parallax effect
        float parallaxEffect = sin(vPosition.x * u_parallax + vPosition.y * u_parallax + t) * 0.1;
        finalColor += parallaxEffect;
        
        // Add some glow
        float glow = 1.0 - length(uv - 0.5) * 1.5;
        glow = max(0.0, glow);
        finalColor += glow * 0.2;
        
        gl_FragColor = vec4(finalColor, ${transparent ? '0.6' : '1.0'});
      }
    `

    // Create geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 50, 50)
    
    // Create material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_speed: { value: speed },
        u_frequency: { value: frequency },
        u_warpStrength: { value: warpStrength },
        u_noise: { value: noise },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_mouseInfluence: { value: mouseInfluence },
        u_scale: { value: scale },
        u_parallax: { value: parallax },
        u_colors: {
          value: colorArray.map(c => new THREE.Vector3(c[0], c[1], c[2]))
        },
      },
      transparent: transparent,
      side: THREE.DoubleSide,
    })

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.z = rotation
    scene.add(mesh)
    meshRef.current = mesh

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseInfluence === 0) return
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = 1 - ((e.clientY - rect.top) / rect.height) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      
      timeRef.current += 0.016
      
      if (meshRef.current && material) {
        material.uniforms.u_time.value = timeRef.current
        material.uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y)
        
        if (autoRotate !== 0) {
          meshRef.current.rotation.z += autoRotate * 0.01
        }
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [mounted, colors, rotation, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise, transparent, autoRotate])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
    />
  )
}
