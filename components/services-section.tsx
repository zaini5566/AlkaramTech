"use client"

import { ArrowRight, Bot, Code2, Megaphone, ShoppingCart } from "lucide-react"

import { TiltCard } from "@/components/tilt-card"

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites and web apps engineered for speed, conversions, and scale.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Content strategy and campaigns that turn followers into paying customers.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Intelligent workflows that handle the busywork, freeing your team for growth.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Strategy",
    description:
      "End-to-end online store builds that convert browsers into loyal buyers.",
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative flex flex-col justify-center overflow-hidden bg-background py-14 sm:py-16 lg:min-h-svh lg:py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              Services
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              <span className="text-blue-600 italic">Services</span> We
              Provide
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
          >
            View All Services
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <TiltCard
              key={service.title}
              className="border-transparent bg-zinc-900 shadow-none group-hover:shadow-none"
            >
              <div className="flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="group/link mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-white"
                >
                  Learn more
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
                    <ArrowRight className="h-3 w-3 text-white transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </span>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
