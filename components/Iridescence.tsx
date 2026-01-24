'use client'

import { useEffect, useRef, useState } from 'react'

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
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
    
    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '-1'
    canvasRef.current = canvas
    container.appendChild(canvas)

    // Get WebGL context
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) {
      console.error('WebGL not supported')
      return
    }
    glRef.current = gl

    // Set canvas size
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = container.clientWidth
      const height = container.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      gl.viewport(0, 0, width * dpr, height * dpr)
    }
    setSize()

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader
    const fragmentShaderSource = `
      precision highp float;
      
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_color;
      uniform float u_amplitude;
      uniform float u_speed;
      uniform vec2 u_resolution;
      
      varying vec2 v_uv;
      
      void main() {
        vec2 uv = v_uv;
        
        // Mouse interaction
        vec2 mouse = u_mouse * 0.5;
        uv += mouse * 0.1;
        
        // Create iridescence effect
        vec2 center = vec2(0.5, 0.5);
        vec2 toCenter = uv - center;
        float angle = atan(toCenter.y, toCenter.x);
        float radius = length(toCenter);
        
        // Time-based animation
        float t = u_time * u_speed;
        
        // Iridescence calculation
        float iridescence = sin(angle * 3.0 + radius * 10.0 + t) * 0.5 + 0.5;
        iridescence = pow(iridescence, 1.5);
        
        // Color mixing
        vec3 baseColor = u_color;
        vec3 iridescentColor = vec3(
          sin(iridescence * 3.14159 + 0.0) * 0.5 + 0.5,
          sin(iridescence * 3.14159 + 2.094) * 0.5 + 0.5,
          sin(iridescence * 3.14159 + 4.189) * 0.5 + 0.5
        );
        
        vec3 finalColor = mix(baseColor, iridescentColor, iridescence * u_amplitude);
        
        // Add some glow
        float glow = 1.0 - radius * 1.5;
        glow = max(0.0, glow);
        finalColor += glow * 0.2;
        
        gl_FragColor = vec4(finalColor, 0.4);
      }
    `

    // Compile shader
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
    
    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = gl.createProgram()
    if (!program) return
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    
    programRef.current = program
    gl.useProgram(program)

    // Create geometry
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
    const colorLocation = gl.getUniformLocation(program, 'u_color')
    const amplitudeLocation = gl.getUniformLocation(program, 'u_amplitude')
    const speedLocation = gl.getUniformLocation(program, 'u_speed')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

    // Handle resize
    const handleResize = () => {
      setSize()
      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      }
    }
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
    const animate = () => {
      if (!gl || !program) return
      
      timeRef.current += 0.016
      
      gl.useProgram(program)
      
      // Set uniforms
      if (timeLocation) gl.uniform1f(timeLocation, timeRef.current)
      if (mouseLocation) gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
      if (colorLocation) gl.uniform3f(colorLocation, color[0], color[1], color[2])
      if (amplitudeLocation) gl.uniform1f(amplitudeLocation, amplitude)
      if (speedLocation) gl.uniform1f(speedLocation, speed)
      
      // Clear and draw
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas)
      }
      if (gl) {
        const loseContext = gl.getExtension('WEBGL_lose_context')
        loseContext?.loseContext()
      }
    }
  }, [mounted, color, mouseReact, amplitude, speed])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
    />
  )
}
