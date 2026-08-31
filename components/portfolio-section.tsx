"use client"

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

import { TiltCard } from "@/components/tilt-card"
import { PROJECTS } from "@/lib/projects"

// The track is rendered as several back-to-back copies of PROJECTS so the
// carousel always has more cards to scroll into — the scroll position is
// silently rewound by one copy-width whenever it drifts into a buffer copy,
// which is invisible because every copy shows the same 3 cards in order.
const LOOP_COPIES = 3
const LOOPED_PROJECTS = Array.from({ length: LOOP_COPIES }).flatMap((_, copy) =>
  PROJECTS.map((project) => ({ ...project, key: `${project.title}-${copy}` }))
)

// How long each card stays in place before the carousel auto-advances.
const AUTOPLAY_INTERVAL_MS = 4000
// How long to hold off after a manual interaction (drag or wheel) before autoplay resumes.
const AUTOPLAY_RESUME_DELAY_MS = 3000
// Idle gap after the last scroll event before checking whether the loop needs rewinding.
const LOOP_SETTLE_MS = 120

export function PortfolioSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loopSettleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dragStateRef = useRef<{ startX: number; startScrollLeft: number; dragging: boolean } | null>(null)
  const suppressClickRef = useRef(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = query.matches
    const onChange = () => {
      reducedMotionRef.current = query.matches
    }
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  // Start on the middle copy so there's a full copy of buffer to scroll into
  // on both sides.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollLeft = scroller.scrollWidth / LOOP_COPIES
  }, [])

  // Whenever a scroll (autoplay, drag, or wheel) settles inside a buffer
  // copy, jump back into the middle copy without animating — every copy is
  // identical, so the rewind is invisible.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    function onScroll() {
      if (loopSettleTimeoutRef.current) clearTimeout(loopSettleTimeoutRef.current)
      loopSettleTimeoutRef.current = setTimeout(() => {
        const el = scrollerRef.current
        if (!el) return
        const oneSetWidth = el.scrollWidth / LOOP_COPIES
        if (el.scrollLeft <= 1) {
          el.scrollLeft += oneSetWidth
        } else if (el.scrollLeft >= oneSetWidth * 2 - 1) {
          el.scrollLeft -= oneSetWidth
        }
      }, LOOP_SETTLE_MS)
    }
    scroller.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      scroller.removeEventListener("scroll", onScroll)
      if (loopSettleTimeoutRef.current) clearTimeout(loopSettleTimeoutRef.current)
    }
  }, [])

  const advance = useCallback((direction: 1 | -1) => {
    const scroller = scrollerRef.current
    const card = scroller?.children[0] as HTMLElement | undefined
    if (!scroller || !card) return
    const gap = parseFloat(getComputedStyle(scroller).columnGap || "0")
    const step = card.getBoundingClientRect().width + gap
    scroller.scrollBy({ left: step * direction, behavior: "smooth" })
  }, [])

  const scheduleAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current)
    if (reducedMotionRef.current) return
    autoplayTimeoutRef.current = setTimeout(() => {
      advance(1)
      scheduleAutoplay()
    }, AUTOPLAY_INTERVAL_MS)
  }, [advance])

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  const deferAutoplayResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(scheduleAutoplay, AUTOPLAY_RESUME_DELAY_MS)
  }, [scheduleAutoplay])

  useEffect(() => {
    scheduleAutoplay()
    return () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [scheduleAutoplay])

  // A horizontal wheel gesture (trackpad swipe, shift+wheel) drives the
  // carousel. A plain vertical mouse wheel is left alone so the page keeps
  // scrolling normally while the cursor happens to be over the cards.
  // React's onWheel is passive by default, so preventDefault needs a native
  // listener instead.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      scroller!.scrollLeft += e.deltaX
      pauseAutoplay()
      deferAutoplayResume()
    }
    scroller.addEventListener("wheel", onWheel, { passive: false })
    return () => scroller.removeEventListener("wheel", onWheel)
  }, [pauseAutoplay, deferAutoplayResume])

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return
    const scroller = scrollerRef.current
    if (!scroller) return
    dragStateRef.current = { startX: e.clientX, startScrollLeft: scroller.scrollLeft, dragging: false }
    scroller.setPointerCapture(e.pointerId)
    pauseAutoplay()
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    const state = dragStateRef.current
    if (!scroller || !state) return
    const dx = e.clientX - state.startX
    if (Math.abs(dx) > 3) state.dragging = true
    scroller.scrollLeft = state.startScrollLeft - dx
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current
    const state = dragStateRef.current
    if (scroller?.hasPointerCapture(e.pointerId)) {
      scroller.releasePointerCapture(e.pointerId)
    }
    if (state?.dragging) {
      suppressClickRef.current = true
      setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }
    dragStateRef.current = null
    deferAutoplayResume()
  }

  function onClickCapture(e: ReactMouseEvent<HTMLDivElement>) {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  function handleArrowClick(direction: 1 | -1) {
    advance(direction)
    pauseAutoplay()
    deferAutoplayResume()
  }

  return (
    <section
      id="work"
      className="relative flex flex-col justify-center overflow-hidden bg-muted/40 py-14 sm:py-16 lg:min-h-svh lg:py-10"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              My Portfolio
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Latest <span className="text-blue-600 italic">Projects</span>
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
          >
            View All Projects
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <div className="relative m-10 py-4 sm:mt-12 sm:px-12 sm:py-4 lg:px-10">
          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={pauseAutoplay}
            onPointerLeave={deferAutoplayResume}
            onClickCapture={onClickCapture}
            className="no-scrollbar flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto scroll-smooth select-none active:cursor-grabbing"
          >
            {LOOPED_PROJECTS.map((project) => (
            <div
              key={project.key}
              className="w-full shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
            >
              <TiltCard hoverTilt={false} className="h-full bg-card shadow-none group-hover:shadow-none">
                <div className="flex h-full flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.client} website, built by Alkaram Tech`}
                      fill
                      draggable={false}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="pointer-events-none object-cover"
                    />
                    <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-950/80 text-white backdrop-blur-sm">
                      <project.icon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          {project.client}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit the ${project.client} website`}
                        className="group/view flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white transition-colors hover:bg-blue-900"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous project"
            onClick={() => handleArrowClick(-1)}
            className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-950 text-white shadow-lg transition-colors hover:bg-blue-900 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => handleArrowClick(1)}
            className="absolute top-1/2 right-0 z-10 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-950 text-white shadow-lg transition-colors hover:bg-blue-900 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
