'use client'

import { useEffect, useRef } from 'react'
import { Renderer, Geometry, Program, Mesh } from 'ogl'

interface IridescenceProps {
  color?: [number, number, number]
  mouseReact?: boolean
  amplitude?: number
  speed?: number
}

export default function Iridescence({
  color = [0.5, 0.6, 0.8],
  mouseReact = true,
  amplitude = 0.1,
  speed = 1,
}: IridescenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const meshRef = useRef<Mesh | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const renderer = new Renderer({
      alpha: true,
      antialias: true,
    })
    const gl = renderer.gl
    container.appendChild(gl.canvas)
    rendererRef.current = renderer

    gl.clearColor(0, 0, 0, 0)

    // Vertex shader
    const vertex = /* glsl */ `
      attribute vec2 position;
      varying vec2 vUv;
      
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    // Fragment shader with iridescence effect
    const fragment = /* glsl */ `
      precision highp float;
      
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uColor;
      uniform float uAmplitude;
      uniform float uSpeed;
      
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        
        // Add mouse interaction
        vec2 mouse = uMouse * 0.5;
        uv += mouse * 0.1;
        
        // Create iridescence effect
        float angle = atan(uv.y - 0.5, uv.x - 0.5);
        float radius = length(uv - 0.5);
        
        // Time-based animation
        float t = uTime * uSpeed;
        
        // Iridescence calculation
        float iridescence = sin(angle * 3.0 + radius * 10.0 + t) * 0.5 + 0.5;
        iridescence = pow(iridescence, 1.5);
        
        // Color mixing
        vec3 baseColor = uColor;
        vec3 iridescentColor = vec3(
          sin(iridescence * 3.14159 + 0.0) * 0.5 + 0.5,
          sin(iridescence * 3.14159 + 2.094) * 0.5 + 0.5,
          sin(iridescence * 3.14159 + 4.189) * 0.5 + 0.5
        );
        
        vec3 finalColor = mix(baseColor, iridescentColor, iridescence * uAmplitude);
        
        // Add some glow
        float glow = 1.0 - radius * 1.5;
        glow = max(0.0, glow);
        finalColor += glow * 0.2;
        
        gl_FragColor = vec4(finalColor, 0.3);
      }
    `

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
        uColor: { value: color },
        uAmplitude: { value: amplitude },
        uSpeed: { value: speed },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    meshRef.current = mesh

    // Handle resize
    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseReact) return
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = 1 - ((e.clientY - rect.top) / rect.height) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const animate = () => {
      timeRef.current += 0.016 // ~60fps
      
      if (meshRef.current) {
        const program = meshRef.current.program
        program.uniforms.uTime.value = timeRef.current
        program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y]
      }
      
      renderer.render({ scene: mesh })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [color, mouseReact, amplitude, speed])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
