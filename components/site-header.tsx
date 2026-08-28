"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12)
  })

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [scrolled])

  // A plain hash <a> inside the closing mobile menu never scrolls: closing
  // the menu re-renders/unmounts it in the same tick as the click, which
  // reliably defeats the browser's native scroll-to-hash jump (confirmed —
  // a manual scrollIntoView right after works fine, the native jump never
  // moves scrollY at all). So we drive the scroll ourselves instead of
  // relying on the anchor's default action.
  function navigateTo(href: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setOpen(false)
      document.body.style.overflow = ""
      // Scrolling in the same tick as clearing overflow:hidden is a no-op —
      // the browser hasn't reflowed into a scrollable layout yet. One frame
      // is enough for that to settle.
      requestAnimationFrame(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      })
      window.history.pushState(null, "", href)
    }
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-blue-950/90 backdrop-blur-xl transition-shadow duration-300",
        scrolled || open
          ? "shadow-lg shadow-blue-950/20"
          : "shadow-none"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-18 lg:px-8">
        <a href="#top" onClick={navigateTo("#top")} className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-900/40">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">
            Alkaram <span className="font-normal text-white/55">Tech</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            size="sm"
            className="group rounded-full bg-blue-600 pr-3 pl-4 text-white shadow-md shadow-blue-900/40 hover:bg-blue-500"
          >
            Book a Call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-blue-950/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={navigateTo(link.href)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <Button
                render={<a href="#contact" onClick={navigateTo("#contact")} />}
                nativeButton={false}
                className="mt-2 w-full rounded-full bg-blue-600 text-white hover:bg-blue-500"
              >
                Book a Call
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
