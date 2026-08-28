"use client"

import { motion } from "motion/react"

// Placeholder wordmarks — swap these for real client logos when available.
const LOGOS = [
  "Nova",
  "Verge",
  "Cobalt",
  "Meridian",
  "Fieldstone",
  "Northstar",
  "Anchor & Co.",
  "Lumen",
]

export function TrustedBySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-y border-border bg-background py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Trusted by ambitious teams
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-16 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...LOGOS, ...LOGOS].map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-2xl font-bold tracking-tight text-muted-foreground/50 transition-colors hover:text-foreground sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
