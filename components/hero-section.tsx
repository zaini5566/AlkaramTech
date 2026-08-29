"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, type Variants } from "motion/react"
import { Lottie } from "lottie-react"
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Code2,
  Globe,
  Megaphone,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AiNetworkBackground } from "@/components/ai-network-background"
import aiAutomationLottie from "@/lib/lottie/ai-automation.json"
import webDevelopmentLottie from "@/lib/lottie/web-development.json"
import socialMediaMarketingLottie from "@/lib/lottie/social-media-marketing.json"
import ecommerceStrategyLottie from "@/lib/lottie/ecommerce-strategy.json"

const HeroFigure = dynamic(
  () => import("@/components/hero-figure").then((mod) => mod.HeroFigure),
  { ssr: false }
)

type ServiceItem = {
  label: string
  headline: string
  icon: LucideIcon
  accent: string
  lottie?: object
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    label: "Web Development",
    headline: "Web Experiences",
    icon: Code2,
    accent: "#1d4ed8",
    lottie: webDevelopmentLottie,
  },
  {
    label: "Social Media Marketing",
    headline: "Marketing Engines",
    icon: Megaphone,
    accent: "#0ea5e9",
    lottie: socialMediaMarketingLottie,
  },
  {
    label: "AI Automation",
    headline: "AI Automations",
    icon: Bot,
    accent: "#2563eb",
    lottie: aiAutomationLottie,
  },
  {
    label: "E-commerce Strategy",
    headline: "Online Stores",
    icon: ShoppingCart,
    accent: "#06b6d4",
    lottie: ecommerceStrategyLottie,
  },
]

// How long each service stays on screen before auto-rotating to the next.
const ROTATION_INTERVAL_MS = 6000
// How long the headline word / character crossfade takes to play, in seconds.
const SWAP_TRANSITION_SECONDS = 0.5

const STATS = [
  { value: "8+", label: "Years in business", icon: Star },
  { value: "120+", label: "Projects delivered", icon: TrendingUp },
  { value: "40+", label: "Brands scaled", icon: Globe },
  { value: "24/7", label: "Support & monitoring", icon: Users },
]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = SERVICE_ITEMS[activeIndex]
  const activeIndexRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)
    const onChange = () => setReducedMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  // Single source of truth: every update (click or auto-tick) reads and
  // writes this ref synchronously, so there is never a window where a
  // functional state updater can compute its "next" value from state that
  // a near-simultaneous click has already superseded.
  const setActive = useCallback((index: number) => {
    activeIndexRef.current = index
    setActiveIndex(index)
  }, [])

  const scheduleNextTick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setActive((activeIndexRef.current + 1) % SERVICE_ITEMS.length)
      scheduleNextTick()
    }, ROTATION_INTERVAL_MS)
  }, [setActive])

  useEffect(() => {
    scheduleNextTick()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [scheduleNextTick])

  function selectService(index: number) {
    setActive(index)
    scheduleNextTick()
  }

  // Scroll-linked fade / parallax as the hero leaves the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background"
    >
      {/* Background layers */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-10%,rgba(30,64,175,0.08),transparent)]" />
        <AiNetworkBackground />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={cn(
          "relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-6 pt-32 pb-16 lg:grid-cols-2 lg:gap-8 lg:px-8",
          '[grid-template-areas:"intro"_"figure"_"pills"_"cta"_"stats"]',
          'lg:[grid-template-areas:"intro_figure"_"pills_figure"_"cta_figure"_"stats_stats"]'
        )}
      >
        <div className="flex flex-col items-start text-left [grid-area:intro]">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm font-medium text-foreground/80 shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-700" />
            Full-Service IT Agency
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-7 max-w-xl font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          >
            We build{" "}
            <span className="inline-block">
              <motion.span
                key={activeItem.label}
                initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: SWAP_TRANSITION_SECONDS, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
              >
                {activeItem.headline}
              </motion.span>
            </span>
            <br />
            that fuel real growth.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Alkaram Tech partners with ambitious brands to design, build, and
            scale digital products — from high-converting websites to
            AI-powered automation and e-commerce growth engines.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-2.5 [grid-area:pills]"
        >
          {SERVICE_ITEMS.map((service, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={service.label}
                type="button"
                onClick={() => selectService(index)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "border-blue-300 bg-blue-50 text-blue-950 shadow-sm"
                    : "border-border bg-card/60 text-foreground/70 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-950"
                )}
              >
                <service.icon
                  className="h-3.5 w-3.5"
                  style={{ color: service.accent }}
                />
                {service.label}
              </button>
            )
          })}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex w-full flex-row items-center gap-3 [grid-area:cta] sm:w-auto"
        >
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            size="lg"
            className="group h-11 flex-1 justify-center rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 px-4 text-sm font-medium whitespace-nowrap text-white shadow-lg shadow-blue-600/25 hover:opacity-90 sm:h-12 sm:flex-none sm:px-7 sm:text-base"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            render={<a href="#work" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="h-11 flex-1 justify-center rounded-full px-4 text-sm font-medium whitespace-nowrap sm:h-12 sm:flex-none sm:px-7 sm:text-base"
          >
            Explore Our Work
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative h-[320px] w-full [grid-area:figure] sm:h-[420px] lg:h-[560px]"
        >
          <HeroFigure
            className="h-full w-full"
            eventSource={sectionRef}
            accent={activeItem.accent}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              key={activeItem.label}
              initial={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: SWAP_TRANSITION_SECONDS, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex items-center justify-center",
                activeItem.lottie
                  ? "h-[62%] w-[62%]"
                  : "h-16 w-16 overflow-hidden rounded-2xl border border-white/50 bg-white/10 shadow-xl backdrop-blur-md sm:h-20 sm:w-20 lg:h-24 lg:w-24"
              )}
              style={
                activeItem.lottie
                  ? undefined
                  : { boxShadow: `0 0 60px 8px ${activeItem.accent}40` }
              }
            >
              {activeItem.lottie ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-6 -z-10 rounded-full opacity-50 blur-3xl"
                    style={{ backgroundColor: activeItem.accent }}
                  />
                  <Lottie
                    src={activeItem.lottie}
                    loop={!reducedMotion}
                    autoplay={!reducedMotion}
                    className="h-full w-full drop-shadow-2xl"
                  />
                </>
              ) : (
                <activeItem.icon
                  className="h-7 w-7 text-white sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                  style={{ filter: `drop-shadow(0 0 10px ${activeItem.accent})` }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-4 w-full max-w-3xl [grid-area:stats] lg:mt-10"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 rounded-2xl border border-border/60 bg-card/90 px-6 py-6 shadow-lg shadow-blue-900/5 backdrop-blur-md sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-border/70 sm:px-4 sm:py-7">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-1.5 px-2 text-center sm:px-4"
              >
                <div className="flex items-center gap-1.5">
                  <stat.icon className="h-4 w-4 shrink-0 text-blue-600" />
                  <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="relative z-10 mb-8 flex flex-col items-center gap-2 self-center text-muted-foreground"
      >
        {/* <span className="text-xs font-medium tracking-wide uppercase">
          Scroll to explore
        </span> */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
