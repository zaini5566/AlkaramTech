"use client"

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react"
import { motion, useMotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export function TiltCard({
  children,
  className,
  hoverTilt = true,
}: {
  children: ReactNode
  className?: string
  /**
   * Continuous mouse-tracking tilt fights interactive content: as a cursor
   * moves toward a field to click it, the card keeps rotating underneath,
   * turning the target into a moving one. Set false for cards containing
   * real inputs/links people need to click precisely (e.g. a form) — the
   * one-time scroll-in rotation still applies either way.
   */
  hoverTilt?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Continuous 3D scroll effect: the card rotates up out of the page as it
  // scrolls into view, driven directly by scroll position rather than a
  // one-shot trigger.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "start 45%"],
  })
  const entranceRotateX = useTransform(scrollYProgress, [0, 1], [55, 0])
  const entranceY = useTransform(scrollYProgress, [0, 1], [120, 0])
  const entranceOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Interactive tilt that follows the cursor while hovering. Driven by our
  // own rAF loop (lerping toward a target each frame). The pointer listeners
  // live on a stable, untransformed wrapper — not on the element that
  // actually rotates — because a rotating element's own hit-test region
  // shifts under the cursor as it tilts, which fires a spurious
  // pointerleave and resets the tilt to zero mid-hover.
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const targetRef = useRef({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    if (!hoverTilt) return
    let frame: number
    const tick = () => {
      const t = targetRef.current
      rotateX.set(rotateX.get() + (t.rotateX - rotateX.get()) * 0.15)
      rotateY.set(rotateY.get() + (t.rotateY - rotateY.get()) * 0.15)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [rotateX, rotateY, hoverTilt])

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!hoverTilt) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    targetRef.current = {
      rotateX: 9 - py * 18,
      rotateY: -9 + px * 18,
    }
  }

  function handlePointerLeave() {
    if (!hoverTilt) return
    targetRef.current = { rotateX: 0, rotateY: 0 }
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: entranceRotateX,
        y: entranceY,
        opacity: entranceOpacity,
        transformPerspective: 1200,
      }}
      className="h-full [transform-style:preserve-3d]"
    >
      {/* Stable hit-test layer: listens for the pointer, never rotates itself. */}
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="group h-full"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className={cn(
            "relative h-full overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg shadow-black/20 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-black/30 [transform-style:preserve-3d]",
            className
          )}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}
