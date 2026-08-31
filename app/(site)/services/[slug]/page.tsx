import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react"

import { AiNetworkBackground } from "@/components/ai-network-background"
import { TiltCard } from "@/components/tilt-card"
import { ServiceIconBadge } from "@/components/service-icon-badge"
import { ProjectCaseStudy } from "@/components/project-case-study"
import { SERVICES, getServiceBySlug } from "@/lib/services"
import { PROJECTS } from "@/lib/projects"

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}

  return {
    title: `${service.label} — Alkaram Tech`,
    description: service.tagline,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative isolate flex min-h-[85svh] flex-col justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 75% 60% at 50% -10%, ${service.accent}40, transparent)`,
            }}
          />
          <AiNetworkBackground />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8">
          <ServiceIconBadge accent={service.accent}>
            <service.icon className="h-9 w-9 sm:h-11 sm:w-11" />
          </ServiceIconBadge>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            Our Services
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            {service.headline}{" "}
            <span
              className="bg-clip-text text-transparent italic"
              style={{ backgroundImage: `linear-gradient(90deg, ${service.accent}, #67e8f9)` }}
            >
              {service.headlineAccent}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            {service.tagline}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center rounded-full bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
            >
              Start Your Project
              <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="relative bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              Sound Familiar?
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              You&apos;re not imagining the problem.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {service.painPoints.map((point) => (
              <TiltCard key={point.title} className="bg-white">
                <div className="flex h-full flex-col p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {point.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative bg-muted/40 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              What You Get
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Everything included, <span className="text-blue-600 italic">nothing vague</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <TiltCard key={item.title} className="bg-white">
                <div className="flex h-full flex-col p-6">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ background: `linear-gradient(135deg, ${service.accent}, #06b6d4)` }}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              How We Work
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              No black box. <span className="text-blue-600 italic">Just a clear path.</span>
            </h2>
          </div>

          <div className="relative mt-14">
            <div
              className="absolute top-2 bottom-2 left-5 w-px bg-zinc-200 sm:left-6"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-10">
              {service.process.map((step, index) => (
                <div key={step.title} className="relative flex gap-5 sm:gap-6">
                  <div
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white sm:h-12 sm:w-12"
                    style={{ background: `linear-gradient(135deg, ${service.accent}, #06b6d4)` }}
                  >
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

      {/* Differentiators */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 sm:py-24">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${service.accent}33, transparent)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              Why Alkaram Tech
            </span>
            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
              Here&apos;s the difference.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {service.differentiators.map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white sm:mx-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      {service.showcaseProjects ? (
        <section className="relative bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
                <span className="h-px w-4 bg-zinc-400" />
                Proof, Not Promises
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
                Real sites, <span className="text-blue-600 italic">real results</span>
              </h2>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-24 px-6 lg:gap-32 lg:px-8">
            {PROJECTS.map((project, index) => (
              <ProjectCaseStudy key={project.title} index={index} reversed={index % 2 === 1} />
            ))}
          </div>
        </section>
      ) : (
        <section className="relative bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-4xl">
              See the kind of work we <span className="text-blue-600 italic">stand behind</span>
            </h2>
            <p className="mt-4 text-balance text-zinc-600 sm:text-lg">
              Browse the full portfolio to see how we approach real projects, start to finish.
            </p>
            <Link
              href="/portfolio"
              className="group mt-7 inline-flex items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition-colors hover:bg-blue-900"
            >
              View Our Portfolio
              <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
                <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="relative bg-muted/40 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              Questions
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Before you reach out
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-blue-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.35),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {service.closingHeadline}
          </h2>
          <p className="mt-4 text-balance text-white/70 sm:text-lg">
            Tell us about your project — we&apos;ll tell you honestly whether we&apos;re the
            right fit.
          </p>
          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center rounded-full bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
          >
            Start Your Project
            <span className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
