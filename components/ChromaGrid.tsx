'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './ChromaGrid.css'

export interface ChromaItem {
  image: string
  title: string
  subtitle: string
  techStack?: string[]
  videoUrl?: string
  borderColor?: string
  gradient?: string
  detailPageId?: string
  url?: string
}

export interface ChromaGridProps {
  items?: ChromaItem[]
  className?: string
  radius?: number
  columns?: number
  rows?: number
  damping?: number
  fadeOut?: number
  ease?: string
  onCardClick?: (item: ChromaItem) => void
}

type SetterFn = (v: number | string) => void

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onCardClick
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const setX = useRef<SetterFn | null>(null)
  const setY = useRef<SetterFn | null>(null)
  const pos = useRef({ x: 0, y: 0 })
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      url: 'https://github.com/'
    },
  ]
  const data = items?.length ? items : demo

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn
    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true
    })
  }

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect()
    moveTo(e.clientX - r.left, e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    })
  }

  const handleCardClick = (item: ChromaItem) => {
    if (onCardClick) {
      onCardClick(item)
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleCardEnter = (index: number) => {
    const video = videoRefs.current.get(index)
    if (video) {
      video.play().catch(() => {
        // Autoplay가 차단된 경우 무시
      })
    }
  }

  const handleCardLeave = (index: number) => {
    const video = videoRefs.current.get(index)
    if (video) {
      video.pause()
    }
  }

  const setVideoRef = (index: number, video: HTMLVideoElement | null) => {
    if (video) {
      videoRefs.current.set(index, video)
    } else {
      videoRefs.current.delete(index)
    }
  }

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--cols': columns,
          '--rows': rows
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onMouseEnter={() => handleCardEnter(i)}
          onMouseLeave={() => handleCardLeave(i)}
          onClick={() => handleCardClick(c)}
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient,
              cursor: c.detailPageId || c.url ? 'pointer' : 'default'
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            {c.videoUrl ? (
              <video
                ref={(el) => setVideoRef(i, el)}
                src={c.videoUrl}
                loop
                muted
                playsInline
                className="chroma-video"
                preload="metadata"
              />
            ) : (
              <img src={c.image} alt={c.title} loading="lazy" />
            )}
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            <p className="role">{c.subtitle}</p>
            {c.techStack && c.techStack.length > 0 && (
              <div className="tech-stack">
                {c.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  )
}

export default ChromaGrid
