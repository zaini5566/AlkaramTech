import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Eye,
  Fingerprint,
  Gem,
  Heart,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react"

import { AiNetworkBackground } from "@/components/ai-network-background"
import { TiltCard } from "@/components/tilt-card"
import { TrustedBySection } from "@/components/trusted-by-section"
import { SERVICES } from "@/lib/services"

export const metadata: Metadata = {
  title: "About Us — Alkaram Tech",
  description:
    "Alkaram Tech is a full-service IT agency that treats every project like our own business is on the line. Here's who we are and how we work.",
}

const STATS = [
  { value: "8+", label: "Years in business" },
  { value: "120+", label: "Projects delivered" },
  { value: "40+", label: "Brands scaled" },
  { value: "24/7", label: "Support & monitoring" },
]

const VALUES = [
  {
    icon: Gem,
    title: "Outcomes over deliverables",
    description: "We're not done when we ship. We're done when it actually works for your business.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    description: "You'll always know what's happening, why we made a decision, and what it costs.",
  },
  {
    icon: Fingerprint,
    title: "Direct access, always",
    description: "You work with the people actually building your project — no account managers relaying messages.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    description: "We build for the next five years of your business, not just for launch day.",
  },
  {
    icon: Sparkles,
    title: "Obsessed with craft",
    description: "Every pixel, every line of code, every campaign gets the same level of care.",
  },
  {
    icon: Heart,
    title: "Ownership mentality",
    description: "We treat every project like it's our own reputation on the line — because it is.",
  },
]

const PROCESS = [
  {
    title: "Discovery",
    description: "We start by understanding your business and your customers, not just a project brief.",
  },
  {
    title: "Strategy",
    description: "A plan built around your actual goals — not a generic template we reuse for everyone.",
  },
  {
    title: "Build",
    description: "Design and development happen in the open. You'll see progress, not just a final reveal.",
  },
  {
    title: "Launch",
    description: "Everything is tested end to end, so launch day is confident, not crossed fingers.",
  },
  {
    title: "Grow",
    description: "We stick around to refine, support, and grow what we built together.",
  },
]

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative isolate flex min-h-[85svh] flex-col justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,rgba(37,99,235,0.32),transparent)]" />
          <AiNetworkBackground />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Timer className="h-3.5 w-3.5 text-cyan-300" />
            About Alkaram Tech
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            We treat your project like{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent italic">
              our reputation
            </span>{" "}
            depends on it.
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            Because it does. We&apos;re a full-service IT agency that designs, builds, and scales
            digital products for brands who need a team, not just a vendor.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center rounded-sm bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
            >
              Start a Project
              <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-sm bg-gradient-to-br from-blue-600 to-cyan-400">
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-sm border border-white/15 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-zinc-950 py-14">
        <div className="mx-auto max-w-6xl border-t border-white/10 px-6 pt-14 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              Our Story
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              Why <span className="text-blue-600 italic">Alkaram Tech</span> exists
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-base leading-relaxed text-zinc-600">
            <p>
              Alkaram Tech started with a simple frustration: too many businesses were paying
              agencies for websites and campaigns that looked great in a pitch deck and did
              nothing for the bottom line.
            </p>
            <p>
              We built Alkaram Tech to be different — a team that measures success the way you
              do: by whether the work actually moves your business forward, not by how many
              slides are in the proposal.
            </p>
            <p>
              Today, we design, build, and scale digital products for hospitals, universities,
              and growing brands who need more than a vendor. They need a team that treats their
              project like it&apos;s our own.
            </p>
            <p className="mt-2 border-l-2 border-blue-600 pl-5 text-lg font-medium text-balance text-zinc-900 italic">
              &ldquo;We&apos;re not interested in being another line item. We want to be the team
              you call when something actually matters.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.25),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-white/50">
              <span className="h-px w-4 bg-white/30" />
              Vision &amp; Mission
            </div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              What we&apos;re working toward
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/10">
            <div className="lg:pr-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-sm font-medium tracking-wide text-white/50 uppercase">
                Our Vision
              </h3>
              <p className="mt-3 text-xl leading-relaxed text-balance text-white sm:text-2xl">
                To become the team ambitious brands call first — not because we&apos;re the
                biggest agency, but because we&apos;re the one that actually delivers.
              </p>
            </div>

            <div className="lg:pl-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-sm font-medium tracking-wide text-white/50 uppercase">
                Our Mission
              </h3>
              <p className="mt-3 text-xl leading-relaxed text-balance text-white sm:text-2xl">
                To design, build, and scale digital products that create real business
                outcomes — with the transparency, speed, and care every client deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              What We Believe
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              The values behind <span className="text-blue-600 italic">every project</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <TiltCard key={value.title} className="bg-white">
                <div className="flex h-full flex-col p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{value.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              How We Work
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              Five steps. <span className="text-blue-600 italic">No black box.</span>
            </h2>
          </div>

          <div className="relative mt-14">
            <div
              className="absolute top-2 bottom-2 left-5 w-px bg-zinc-200 sm:left-6"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-10">
              {PROCESS.map((step, index) => (
                <div key={step.title} className="relative flex gap-5 sm:gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white sm:h-12 sm:w-12">
                    {index + 1}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-zinc-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.25),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              What We Do
            </span>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              Four ways we help brands grow.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${service.accent}, #06b6d4)` }}
                >
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{service.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {service.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustedBySection />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-blue-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.35),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Ready to work with a team that cares?
          </h2>
          <p className="mt-4 text-balance text-white/70 sm:text-lg">
            Tell us about your project — we&apos;ll tell you honestly whether we&apos;re the
            right fit.
          </p>
          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center rounded-sm bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
          >
            Start Your Project
            <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
