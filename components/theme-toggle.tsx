"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Reading the theme before mount would use the server-rendered default
  // (light) and briefly mismatch whatever next-themes' pre-hydration script
  // actually set on <html>, so the thumb only animates in once we know.
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-[68px] shrink-0 items-center rounded-full border border-black/5 bg-muted p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] transition-colors",
        className
      )}
    >
      <Sun className="pointer-events-none absolute left-[9px] h-4 w-4 text-amber-500" />
      <Moon className="pointer-events-none absolute right-[9px] h-4 w-4 text-slate-400" />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md",
          isDark ? "ml-auto" : "ml-0"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-slate-700" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </motion.span>
    </button>
  )
}
