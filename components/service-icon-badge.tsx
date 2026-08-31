"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

// Takes the icon as already-rendered children (resolved in the calling
// server component) rather than a component-reference prop — a raw icon
// function can't cross the server -> client boundary as prop data.
export function ServiceIconBadge({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <motion.div
      style={{
        transformPerspective: 800,
        background: `linear-gradient(135deg, ${accent}, #06b6d4)`,
      }}
      whileHover={{ rotateY: 20, rotateX: -10, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="relative flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-[0_16px_40px_-10px_rgba(37,99,235,0.6)] sm:h-24 sm:w-24"
    >
      {children}
    </motion.div>
  )
}
