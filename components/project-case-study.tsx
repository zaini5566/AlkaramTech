"use client"

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { motion, useMotionValue, useScroll, useTransform } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { PROJECTS } from "@/lib/projects"

// Icons are component references, not serializable data — resolving PROJECTS
// here (rather than accepting the whole project as a prop) keeps them from
// having to cross the server->client boundary from the page's metadata-only
// server component.
export function ProjectCaseStudy({
  index,
  reversed,
}: {
  index: number
  reversed: boolean
}) {
  const project = PROJECTS[index]
  const cardRef = useRef<HTMLDivElement>(null)

  // Scroll-entrance: the image swings in from a shallow 3D angle (mirrored
  // depending on which side it sits on) rather than a plain fade/slide.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "start 45%"],
  })
  const entranceRotateY = useTransform(scrollYProgress, [0, 1], [reversed ? -22 : 22, 0])
  const entranceX = useTransform(scrollYProgress, [0, 1], [reversed ? 60 : -60, 0])
  const entranceOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Cursor-follow tilt, same lerp technique as TiltCard but a gentler range
  // since this image is much larger on screen.
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const targetRef = useRef({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    let frame: number
    const tick = () => {
      const t = targetRef.current
      rotateX.set(rotateX.get() + (t.rotateX - rotateX.get()) * 0.15)
      rotateY.set(rotateY.get() + (t.rotateY - rotateY.get()) * 0.15)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [rotateX, rotateY])

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    targetRef.current = { rotateX: 6 - py * 12, rotateY: -6 + px * 12 }
  }

  function handlePointerLeave() {
    targetRef.current = { rotateX: 0, rotateY: 0 }
  }

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        ref={cardRef}
        style={{
          rotateY: entranceRotateY,
          x: entranceX,
          opacity: entranceOpacity,
          transformPerspective: 1500,
        }}
        className={cn("[transform-style:preserve-3d]", reversed ? "lg:order-2" : "lg:order-1")}
      >
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="group"
        >
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1500 }}
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] [transform-style:preserve-3d] sm:aspect-video"
          >
            <Image
              src={project.image}
              alt={`${project.client} website, built by Alkaram Tech`}
              fill
              draggable={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-950/80 text-white backdrop-blur-sm">
              <project.icon className="h-5 w-5" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className={reversed ? "lg:order-1" : "lg:order-2"}>
        <span className="font-heading text-6xl font-extrabold text-foreground/10 sm:text-7xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-2 text-sm font-medium text-muted-foreground">{project.client}</p>
        <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-balance leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-7 inline-flex items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
        >
          Visit Live Site
          <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
            <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </div>
  )
}
