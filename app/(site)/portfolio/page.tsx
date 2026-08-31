import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AiNetworkBackground } from "@/components/ai-network-background"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { PROJECTS } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Portfolio — Alkaram Tech",
  description:
    "A look at the websites, platforms, and digital products Alkaram Tech has designed and built for hospitals, universities, and student enrollment platforms.",
}

const CATEGORIES = Array.from(new Set(PROJECTS.flatMap((project) => project.tags)))

export default function PortfolioPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative isolate flex min-h-[70svh] flex-col justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,rgba(37,99,235,0.28),transparent)]" />
          <AiNetworkBackground />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              Our Work
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Projects Built To{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent italic">
                Perform
              </span>
            </h1>
            <p className="mt-5 text-balance text-base leading-relaxed text-white/60 sm:text-lg">
              Every project starts with a real problem — a hospital that
              needs patients to find it, a university that needs
              applications to grow, a platform that needs to connect
              students with the right university. Here&apos;s what we built
              to solve them.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-background py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 lg:gap-32 lg:px-8">
          {PROJECTS.map((project, index) => (
            <ProjectCaseStudy
              key={project.title}
              index={index}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-blue-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.35),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Got a project in mind?
          </h2>
          <p className="mt-4 text-balance text-white/70 sm:text-lg">
            Let&apos;s talk about what you&apos;re building — we&apos;ll
            tell you honestly whether we&apos;re the right fit.
          </p>
          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center rounded-full bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
          >
            Start a Conversation
            <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
