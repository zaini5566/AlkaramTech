"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  X as XIcon,
} from "lucide-react"

import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/social-icons"

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "FAQs", href: "#faq" },
]

const SOCIAL_LINKS = [
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "X", Icon: XIcon, href: "#" },
  { label: "LinkedIn", Icon: LinkedinIcon, href: "#" },
  { label: "YouTube", Icon: YoutubeIcon, href: "#" },
]

export function FooterSection() {
  // Same technique as the contact form: FormSubmit needs an absolute
  // redirect URL, which depends on whatever origin the site is served from.
  const [nextUrl, setNextUrl] = useState("")
  useEffect(() => {
    setNextUrl(`${window.location.origin}/thank-you`)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,64,175,0.2),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s <span className="text-blue-400 italic">Connect</span> there
          </h2>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
          >
            Get in Touch
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-950">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-md shadow-blue-600/20">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold tracking-tight text-white">
                Alkaram <span className="font-normal text-white/50">Tech</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              We design, build, and scale digital products for ambitious
              brands — from websites to AI-powered automation.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-blue-400/50 hover:bg-white/10 hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                +92 300 0241292
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                info@alkaramtech.com
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                Model Town Lahore
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">
              Get the Latest Updates
            </h3>
            <p className="mt-4 text-sm text-white/60">
              Product news and agency insights, straight to your inbox.
            </p>
            <form
              action="https://formsubmit.co/zainprodeveloper@gmail.com"
              method="POST"
              className="mt-4"
            >
              <input
                type="hidden"
                name="_subject"
                value="New newsletter signup from the Alkaram Tech website"
              />
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
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pr-1.5 pl-4">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white transition-transform duration-300 hover:scale-105"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-blue-950 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-center text-xs text-white/60 sm:flex-row sm:text-left lg:px-8">
          <p>Copyright © {new Date().getFullYear()} Alkaram Tech. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-white">
              User Terms &amp; Conditions
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
