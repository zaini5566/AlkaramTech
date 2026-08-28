"use client"

import Image from "next/image"
import { ArrowRight, ArrowUpRight, GraduationCap, Stethoscope, BookOpen } from "lucide-react"

import { TiltCard } from "@/components/tilt-card"

const PROJECTS = [
  {
    client: "Dr. A Q Khan Hospital",
    title: "Hospital Website Development",
    tags: ["Web Development", "Healthcare"],
    icon: Stethoscope,
    image: "/dr-aq-khan-hospital.jpg",
    url: "https://draqkhanhospital.org",
  },
  {
    client: "Alkaram University",
    title: "Institutional Website Development",
    tags: ["Web Development", "Education"],
    icon: GraduationCap,
    image: "/alkaram-university.jpg",
    url: "https://akii.edu.pk",
  },
  {
    client: "Uni American Eagles",
    title: "Online Education Platform",
    tags: ["Web Development", "E-Learning"],
    icon: BookOpen,
    image: "/uni-american-eagles.png",
    url: "https://uniae-edu.us",
  },
]

export function PortfolioSection() {
  return (
    <section
      id="work"
      className="relative flex flex-col justify-center overflow-hidden bg-muted/40 py-14 sm:py-16 lg:min-h-svh lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              My Portfolio
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Latest <span className="text-blue-600 italic">Projects</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
          >
            View All Projects
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <TiltCard key={project.title} hoverTilt={false} className="bg-card">
              <div className="flex h-full flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.client} website, built by Alkaram Tech`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-blue-950/80 text-white backdrop-blur-sm">
                    <project.icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {project.client}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit the ${project.client} website`}
                      className="group/view flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-950 text-white transition-colors hover:bg-blue-900"
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/view:translate-x-0.5 group-hover/view:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
