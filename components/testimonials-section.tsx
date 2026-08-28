"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, type PanInfo } from "motion/react"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

import { cn } from "@/lib/utils"

// Placeholder testimonials tied to the fictional client names already used
// in the "Trusted by" logo strip — swap for real client quotes when available.
type Testimonial = {
  name: string
  title: string
  company: string
  quote: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "Founder",
    company: "Nova",
    quote:
      "Alkaram Tech rebuilt our entire web presence in six weeks and our conversion rate nearly doubled. The team just gets what actually moves the needle.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    title: "CMO",
    company: "Cobalt",
    quote:
      "Our social channels went from an afterthought to our #1 acquisition channel. The content calendar alone paid for the whole engagement.",
    rating: 5,
  },
  {
    name: "Priya Anand",
    title: "COO",
    company: "Meridian",
    quote:
      "The AI automation they built now handles what used to take my ops team fifteen hours a week. It just runs, quietly, in the background.",
    rating: 5,
  },
  {
    name: "David Kim",
    title: "Head of E-commerce",
    company: "Fieldstone",
    quote:
      "They migrated our store with zero downtime and checkout abandonment dropped almost overnight. Genuinely impressive execution.",
    rating: 5,
  },
  {
    name: "Elena Torres",
    title: "CEO",
    company: "Northstar",
    quote:
      "Working with Alkaram Tech felt less like hiring an agency and more like adding a technical co-founder.",
    rating: 5,
  },
]

const AUTO_ADVANCE_MS = 5500
const SWIPE_THRESHOLD = 80

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  item,
  className,
}: {
  item: Testimonial
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-6 text-left shadow-sm sm:p-7",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Stars rating={item.rating} />
        <span className="text-sm font-semibold text-foreground">
          {item.rating.toFixed(1)}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {item.quote}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-semibold text-white">
          {initials(item.name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.title}, {item.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const isPausedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Single source of truth: both the click handlers and the auto-advance
  // timer read/write this ref synchronously, so a click landing right as
  // the timer fires can never be silently overwritten by a stale value —
  // same pattern (and same reason) as the hero's service rotator.
  const setActive = useCallback((index: number) => {
    const wrapped =
      ((index % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length
    activeIndexRef.current = wrapped
    setActiveIndex(wrapped)
  }, [])

  const scheduleNextTick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (!isPausedRef.current) {
        setActive(activeIndexRef.current + 1)
      }
      scheduleNextTick()
    }, AUTO_ADVANCE_MS)
  }, [setActive])

  useEffect(() => {
    scheduleNextTick()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [scheduleNextTick])

  function goTo(index: number) {
    setActive(index)
    scheduleNextTick()
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      goTo(activeIndexRef.current + 1)
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      goTo(activeIndexRef.current - 1)
    }
  }

  const prevIndex = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
  const nextIndex = (activeIndex + 1) % TESTIMONIALS.length

  return (
    <section
      id="testimonials"
      className="relative flex flex-col justify-center overflow-hidden bg-muted/40 py-14 sm:py-16 lg:min-h-svh lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="h-px w-4 bg-muted-foreground" />
            Clients Testimonials
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            The Impact of Our Work:{" "}
            <span className="text-blue-600 italic">Client Testimonials</span>
          </h2>
        </div>

        <div
          className="relative mt-12 sm:mt-14"
          onMouseEnter={() => {
            isPausedRef.current = true
          }}
          onMouseLeave={() => {
            isPausedRef.current = false
          }}
        >
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => goTo(prevIndex)}
              aria-label="Previous testimonial"
              className="absolute left-0 z-0 hidden w-72 -translate-x-1/3 scale-90 text-left opacity-50 transition-opacity duration-300 hover:opacity-70 lg:block"
            >
              <TestimonialCard item={TESTIMONIALS[prevIndex]} />
            </button>

            <div className="relative z-10 w-full max-w-md">
              <motion.div
                key={activeIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <TestimonialCard item={TESTIMONIALS[activeIndex]} className="shadow-xl" />
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              aria-label="Next testimonial"
              className="absolute right-0 z-0 hidden w-72 translate-x-1/3 scale-90 text-left opacity-50 transition-opacity duration-300 hover:opacity-70 lg:block"
            >
              <TestimonialCard item={TESTIMONIALS[nextIndex]} />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => goTo(activeIndexRef.current - 1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-950 text-white transition-colors hover:bg-blue-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndexRef.current + 1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white transition-transform duration-300 hover:scale-105"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
