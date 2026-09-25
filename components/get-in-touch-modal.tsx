"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Phone, Send, X } from "lucide-react"

import { WhatsAppIcon } from "@/components/social-icons"

const PHONE_DISPLAY = "+92 300-0241292"
const TEL_HREF = "tel:+923000241292"
const WHATSAPP_HREF = "https://wa.me/923000241292"

export function GetInTouchModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-slate-950/60 backdrop-blur-sm"
          />
          <div
            onClick={onClose}
            className="fixed inset-0 z-[81] flex items-center justify-center p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Get in touch"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-[70vh] w-[90%] max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-2xl sm:w-[70%]"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-sm bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 text-center sm:px-10">
                <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-600">
                  Let&apos;s Connect
                </span>
                <h2 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  How would you like to reach us?
                </h2>
                <p className="mt-3 max-w-md text-balance text-sm text-zinc-500 sm:text-base">
                  Pick whatever&apos;s easiest — we&apos;re happy to talk however works for you.
                </p>

                <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                  <a
                    href={TEL_HREF}
                    onClick={onClose}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-zinc-50 p-6 transition-colors hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-blue-600 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-105">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-zinc-900">Call Us</span>
                    <span className="text-xs text-zinc-500">{PHONE_DISPLAY}</span>
                  </a>

                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-zinc-50 p-6 transition-colors hover:border-green-200 hover:bg-green-50"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-green-500 to-emerald-400 text-white transition-transform duration-300 group-hover:scale-105">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-zinc-900">WhatsApp</span>
                    <span className="text-xs text-zinc-500">Chat instantly</span>
                  </a>

                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-zinc-50 p-6 transition-colors hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-blue-600 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-105">
                      <Send className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-zinc-900">Send a Request</span>
                    <span className="text-xs text-zinc-500">Fill out our form</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
