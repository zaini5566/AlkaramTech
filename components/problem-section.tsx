"use client"

import { Clock, MonitorX, PackageX, TrendingDown } from "lucide-react"

import { TiltCard } from "@/components/tilt-card"

const PROBLEMS = [
  {
    icon: MonitorX,
    title: "Your website isn't converting",
    description:
      "Outdated design, slow load times, and unclear calls-to-action are quietly turning visitors away before they ever become customers.",
  },
  {
    icon: TrendingDown,
    title: "Your marketing feels scattered",
    description:
      "Inconsistent posting and no real strategy mean your brand is easy to scroll past — and even easier to forget.",
  },
  {
    icon: Clock,
    title: "Your team is buried in busywork",
    description:
      "Manual data entry and repetitive tasks eat hours every week that could be spent on the work that actually grows the business.",
  },
  {
    icon: PackageX,
    title: "Your store isn't scaling",
    description:
      "Cart abandonment, clunky checkout flows, and disconnected inventory are capping your revenue right when demand is ready to grow.",
  },
]

export function ProblemSection() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-zinc-950 py-14 sm:py-16 lg:min-h-svh lg:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,64,175,0.2),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            The Problem
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Most businesses are stuck fighting the wrong battles.
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            You&apos;re busy running the business — while your website
            underperforms, your marketing is scattered, your team burns hours
            on repetitive work, and your online store leaks revenue.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2">
          {PROBLEMS.map((problem) => (
            <TiltCard key={problem.title}>
              <div className="p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <problem.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {problem.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
