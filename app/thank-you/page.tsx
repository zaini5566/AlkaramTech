import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Thank You — Alkaram Tech",
  description:
    "Thanks for reaching out. Our team will get back to you within one business day.",
}

export default function ThankYouPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-600/25">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Message sent.
      </h1>
      <p className="mt-4 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        Thanks for reaching out — our team will review your project
        details and get back to you within one business day.
      </p>
      <Link
        href="/#top"
        className="mt-8 inline-flex items-center rounded-full bg-blue-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
      >
        Back to home
      </Link>
    </main>
  )
}
