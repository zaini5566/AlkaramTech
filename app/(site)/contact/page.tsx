import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock3, Mail, MapPin, Phone, Plus } from "lucide-react"

import { AiNetworkBackground } from "@/components/ai-network-background"
import { TiltCard } from "@/components/tilt-card"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Contact Us — Alkaram Tech",
  description:
    "Tell us about your project. Alkaram Tech replies within one business day — no sales pressure, just an honest answer on whether we're the right fit.",
}

const QUICK_CONTACT = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+92 300-0241292",
    description: "Mon–Sat, 10am–7pm PKT",
    href: "tel:+923000241292",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@alkaramtech.com",
    description: "We reply within one business day",
    href: "mailto:info@alkaramtech.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Model Town, Lahore",
    description: "Working with clients worldwide",
    href: "#",
  },
]

const PROCESS = [
  {
    title: "You send us a message",
    description: "Fill out the form below or reach out directly by phone or email — whatever's easiest for you.",
  },
  {
    title: "We review and reply",
    description: "A real person on our team reads every message and gets back to you within one business day.",
  },
  {
    title: "We hop on a quick call",
    description: "A short, no-pressure conversation to understand your goals and see if we're a good fit.",
  },
  {
    title: "You get a clear proposal",
    description: "Scope, timeline, and cost laid out plainly — no jargon, no obligation to move forward.",
  },
]

const FAQS = [
  {
    question: "How fast will you actually respond?",
    answer:
      "Within one business day, usually much sooner. If it's urgent, call or WhatsApp us directly and we'll get back to you the same day.",
  },
  {
    question: "Do I need an exact budget in mind before reaching out?",
    answer:
      "No — a rough range is enough. We'd rather understand your goals first and help you figure out what's realistic than have you guess a number upfront.",
  },
  {
    question: "Do you work with clients outside Pakistan?",
    answer:
      "Yes. We work with clients across different time zones and are comfortable coordinating remotely by call, email, or whatever tool you already use.",
  },
  {
    question: "Is the first conversation going to be a sales pitch?",
    answer:
      "No. It's a conversation about your project. If we're not the right fit, we'll tell you honestly instead of trying to close a deal anyway.",
  },
  {
    question: "Can I just call instead of filling out the form?",
    answer:
      "Of course — the form just helps us prepare before we talk. If you'd rather skip it, call or email us directly and we'll take it from there.",
  },
]

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative isolate flex min-h-[70svh] flex-col justify-center overflow-hidden bg-zinc-950 pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_-10%,rgba(37,99,235,0.32),transparent)]" />
          <AiNetworkBackground />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
            <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
            Replies within 1 business day
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent italic">
              worth talking about
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            Tell us about your project. No sales pressure — just an honest answer on whether
            we&apos;re the right fit.
          </p>
        </div>
      </section>

      {/* Quick contact */}
      <section className="relative bg-zinc-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {QUICK_CONTACT.map((item) => (
              <TiltCard key={item.title} hoverTilt={false} className="bg-white">
                <a href={item.href} className="group flex h-full flex-col p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-sm font-medium text-zinc-500">{item.title}</h3>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Form (reused from the homepage — same form, same source of truth) */}
      <ContactSection />

      {/* What happens next */}
      <section className="relative bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              What Happens Next
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

      {/* FAQ */}
      <section className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
              <span className="h-px w-4 bg-zinc-400" />
              Before You Reach Out
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Questions people usually ask
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-white text-zinc-500 transition-transform duration-200 group-open:rotate-45">
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative contact closer */}
      <section className="relative overflow-hidden bg-blue-950 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(37,99,235,0.35),transparent)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center lg:px-8">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-balance text-white sm:text-3xl">
            Prefer to skip the form?
          </h2>
          <p className="text-balance text-white/70">
            Call or email us directly — we&apos;re happy to talk it through.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="tel:+923000241292"
              className="group inline-flex items-center rounded-sm bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-50"
            >
              +92 300-0241292
              <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-sm bg-gradient-to-br from-blue-600 to-cyan-400">
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              href="mailto:info@alkaramtech.com"
              className="inline-flex items-center rounded-sm border border-white/15 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              info@alkaramtech.com
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
