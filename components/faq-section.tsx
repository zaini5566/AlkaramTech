"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

const FAQS = [
  {
    question: "What services does Alkaram Tech offer?",
    answer:
      "We handle web development, social media marketing, AI automation, and e-commerce strategy — either as standalone engagements or bundled into a single ongoing partnership.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most website and automation projects launch within 4–8 weeks depending on scope. We'll give you a specific timeline after our first call.",
  },
  {
    question: "Do you work with businesses outside the US?",
    answer:
      "Yes — we work with clients across time zones and adjust our communication cadence to fit your team.",
  },
  {
    question: "What does the pricing structure look like?",
    answer:
      "Pricing depends on scope and complexity. We share a clear proposal after understanding your goals — no hidden fees, no surprise retainers.",
  },
  {
    question: "Can I see examples of your past work?",
    answer:
      "Absolutely — check out the Portfolio section above, or ask us for case studies specific to your industry during your first call.",
  },
]

const MARQUEE_TAGS = [
  "Web Development",
  "AI Automation",
  "Social Media Marketing",
  "E-commerce Strategy",
  "UI/UX Design",
  "SEO",
]

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = useId()

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl transition-colors duration-300",
        isOpen
          ? "bg-gradient-to-r from-blue-600 to-cyan-500"
          : "bg-white/5 hover:bg-white/10"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={cn(
            "text-base font-medium sm:text-lg",
            isOpen ? "text-white" : "text-white/90"
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            isOpen ? "bg-white/20" : "bg-white/10"
          )}
        >
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <Plus className="h-4 w-4 text-white" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-white/85 sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative flex flex-col overflow-hidden bg-zinc-950 lg:min-h-svh">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,64,175,0.2),transparent)]" />

      <div className="relative flex flex-1 flex-col justify-center py-14 sm:py-16 lg:py-16">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-white/60">
            <span className="h-px w-4 bg-white/30" />
            FAQs
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Questions? <span className="text-blue-400 italic">Look here.</span>
          </h2>
        </div>

        <div className="relative mx-auto mt-10 flex w-full max-w-2xl flex-col gap-3 px-6 sm:mt-12 lg:px-8">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 py-4">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center gap-3 motion-reduce:animate-none">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="flex shrink-0 items-center gap-3 px-3 text-sm font-semibold tracking-wide text-white uppercase"
            >
              {tag}
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
