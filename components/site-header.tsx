"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Code2,
  Megaphone,
  Menu,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react"

import { cn, sectionHref } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
]

// Dedicated pages don't exist yet — these routes are reserved for when they do.
const SERVICES_MENU = [
  { href: "/services/web-development", label: "Web Development", icon: Code2 },
  { href: "/services/social-media-marketing", label: "Social Media Marketing", icon: Megaphone },
  { href: "/services/ai-automation", label: "AI Automation", icon: Bot },
  { href: "/services/ecommerce-strategy", label: "E-commerce Strategy", icon: ShoppingCart },
]

// Close-on-leave delay for the Services dropdown — without it, the small gap
// between the trigger and the panel reads as "left the menu" and snaps it
// shut before the cursor ever reaches the items.
const SERVICES_MENU_CLOSE_DELAY_MS = 150

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { scrollY } = useScroll()

  function resolveHref(href: string) {
    return href.startsWith("#") ? sectionHref(href, pathname) : href
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12)
  })

  function openServicesMenu() {
    if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current)
    setServicesMenuOpen(true)
  }

  function scheduleServicesMenuClose() {
    if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current)
    servicesCloseTimeoutRef.current = setTimeout(
      () => setServicesMenuOpen(false),
      SERVICES_MENU_CLOSE_DELAY_MS
    )
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [scrolled])

  // Every nav click is driven through here rather than a plain anchor's
  // default action — a real route (e.g. /portfolio) needs router.push() so
  // it's a fast client-side transition instead of a full browser reload,
  // and a hash link needs a manual scrollIntoView because a plain hash <a>
  // inside the closing mobile menu never scrolls: closing the menu
  // re-renders/unmounts it in the same tick as the click, which reliably
  // defeats the browser's native scroll-to-hash jump (confirmed — a manual
  // scrollIntoView right after works fine, the native jump never moves
  // scrollY at all).
  function navigateTo(href: string) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      setOpen(false)
      document.body.style.overflow = ""

      if (!href.startsWith("#")) {
        router.push(href)
        return
      }

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-2xl border border-border bg-background/85 px-4 backdrop-blur-xl transition-all duration-300 lg:h-18 lg:px-5",
            scrolled || open
              ? "shadow-[0_16px_40px_-12px_rgba(15,23,42,0.35)]"
              : "shadow-[0_10px_30px_-10px_rgba(15,23,42,0.2)]"
          )}
        >
          <a
            href={resolveHref("#top")}
            onClick={navigateTo(resolveHref("#top"))}
            className="group flex items-center gap-2.5"
          >
            <motion.span
              style={{ transformPerspective: 400 }}
              whileHover={{ rotateY: 25, rotateX: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-[0_3px_0_0_#0e3a8a,0_8px_16px_-4px_rgba(30,64,175,0.5)]"
            >
              <Sparkles className="h-4 w-4 text-white" />
            </motion.span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Alkaram <span className="font-normal text-muted-foreground">Tech</span>
            </span>
          </a>

          <nav
            className="relative hidden items-center gap-1 rounded-full bg-blue-950 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent_60%)] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-8px_16px_-8px_rgba(0,0,0,0.4),0_10px_24px_-8px_rgba(15,23,42,0.55)] lg:flex"
          >
            {NAV_LINKS.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleServicesMenuClose}
                >
                  <a
                    href={resolveHref(link.href)}
                    onClick={navigateTo(resolveHref(link.href))}
                    className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-cyan-300 active:bg-white/20 active:text-cyan-200"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        servicesMenuOpen && "rotate-180"
                      )}
                    />
                  </a>

                  <AnimatePresence>
                    {servicesMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl border border-border bg-background/95 p-2 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.35)] backdrop-blur-xl"
                      >
                        {SERVICES_MENU.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-blue-50 active:bg-blue-100"
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                              <service.icon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-medium text-foreground transition-colors group-hover/item:text-blue-700">
                              {service.label}
                            </span>
                            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={navigateTo(resolveHref(link.href))}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-cyan-300 active:bg-white/20 active:text-cyan-200"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button
              render={<a href={resolveHref("#contact")} onClick={navigateTo(resolveHref("#contact"))} />}
              nativeButton={false}
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-white shadow-[0_4px_0_0_#0e3a8a] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#0e3a8a] active:translate-y-0.5 active:shadow-[0_1px_0_0_#0e3a8a]"
            >
              <MessageCircle className="h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.06)] transition-all duration-150 active:translate-y-0.5 active:shadow-none"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[61] flex h-full w-[82%] max-w-xs flex-col bg-background shadow-[-16px_0_40px_-12px_rgba(15,23,42,0.35)] lg:hidden"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
                <span className="text-base font-semibold tracking-tight text-foreground">
                  Alkaram <span className="font-normal text-muted-foreground">Tech</span>
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-border"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={resolveHref(link.href)}
                    onClick={navigateTo(resolveHref(link.href))}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="rounded-xl px-3.5 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 active:text-blue-800"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="shrink-0 border-t border-border p-5">
                <Button
                  render={<a href={resolveHref("#contact")} onClick={navigateTo(resolveHref("#contact"))} />}
                  nativeButton={false}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_4px_0_0_#0e3a8a] active:translate-y-0.5 active:shadow-[0_1px_0_0_#0e3a8a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get In Touch
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
