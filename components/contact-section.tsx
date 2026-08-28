"use client"

import { useEffect, useState, type ReactNode } from "react"
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/tilt-card"

const CONTACT_INFO = [
  { icon: Phone, label: "+1 (406) 555-0120", href: "tel:+14065550120" },
  {
    icon: Mail,
    label: "hello@alkaramtech.com",
    href: "mailto:hello@alkaramtech.com",
  },
  { icon: MessageCircle, label: "@alkaramtech", href: "#" },
  {
    icon: MapPin,
    label: "2464 Royal Ln. Mesa, New Jersey 45463",
    href: "#",
  },
]

const INTEREST_OPTIONS = [
  "Web Development",
  "Social Media Marketing",
  "AI Automation",
  "E-commerce Strategy",
]
const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
]
const COUNTRY_OPTIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Pakistan",
  "Other",
]

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-blue-500 focus:outline-none"

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-foreground/80"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
    </div>
  )
}

export function ContactSection() {
  // FormSubmit needs an absolute redirect URL, which depends on whatever
  // origin the site ends up served from — fill it in after mount rather
  // than hardcoding one.
  const [nextUrl, setNextUrl] = useState("")
  useEffect(() => {
    setNextUrl(`${window.location.origin}/thank-you`)
  }, [])

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />
      <div className="absolute top-1/3 right-0 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              Contact Us
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              Let&apos;s Talk for{" "}
              <span className="text-blue-600 italic">Your Next Projects</span>
            </h2>
            <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tell us a bit about your goals and timeline — we&apos;ll get
              back to you within one business day with next steps.
            </p>

            <ul className="mt-9 flex flex-col gap-4">
              {CONTACT_INFO.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-md shadow-blue-600/20">
                      <item.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <TiltCard className="border-border bg-muted/40" hoverTilt={false}>
            <form
              action="https://formsubmit.co/zainprodeveloper@gmail.com"
              method="POST"
              className="p-6 sm:p-8"
            >
              <input type="hidden" name="_subject" value="New inquiry from the Alkaram Tech website" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={nextUrl} />
              <input
                type="text"
                name="_honey"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Your Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ex. John Doe"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter Phone Number"
                    className={inputClass}
                  />
                </Field>
                <Field label="I'm Interested in" htmlFor="interest">
                  <select
                    id="interest"
                    name="interest"
                    required
                    defaultValue=""
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget Range (USD)" htmlFor="budget">
                  <select
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select Range
                    </option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Country" htmlFor="country">
                  <select
                    id="country"
                    name="country"
                    required
                    defaultValue=""
                    className={cn(inputClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    {COUNTRY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Your Message" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Enter here.."
                    className={cn(inputClass, "resize-none")}
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="group mt-7 inline-flex items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition-colors hover:bg-blue-900"
              >
                Submit
                <span className="ml-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
                  <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
