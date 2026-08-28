"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 130
const MOUSE_DISTANCE = 190

export function AiNetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !parent || !ctx) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let frame = 0
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      width = parent!.clientWidth
      height = parent!.clientHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(
        85,
        Math.max(32, Math.round((width * height) / 20000))
      )
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x <= 0 || p.x >= width) p.vx *= -1
          if (p.y <= 0 || p.y >= height) p.vy *= -1
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DISTANCE) {
            ctx!.strokeStyle = `rgba(30, 64, 175, ${(1 - dist / LINK_DISTANCE) * 0.16})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }

        const mDist = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (mDist < MOUSE_DISTANCE) {
          ctx!.strokeStyle = `rgba(37, 99, 235, ${(1 - mDist / MOUSE_DISTANCE) * 0.4})`
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(mouse.x, mouse.y)
          ctx!.stroke()
        }
      }

      for (const p of particles) {
        ctx!.fillStyle = "rgba(29, 78, 216, 0.5)"
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (!reduceMotion && visible) {
        frame = requestAnimationFrame(draw)
      }
    }

    // Listen on window (not the canvas/parent) since visible foreground
    // content sits above the canvas and would otherwise swallow the
    // pointer events before they ever reach this background layer.
    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handlePointerLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    function handleVisibility() {
      visible = document.visibilityState === "visible"
      if (visible && !reduceMotion) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(draw)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(parent)
    resize()
    draw()

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}
