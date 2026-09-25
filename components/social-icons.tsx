import type { SVGProps } from "react"

// lucide-react no longer ships brand/logo icons, so these small stroke-based
// marks (matching lucide's own visual language) fill in for the footer's
// social links.

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 8.5h-1.8c-.7 0-1.2.6-1.2 1.3V11h3l-.4 3h-2.6v7h-3v-7H7v-3h1.9V9.3C8.9 7 10.5 5.5 12.7 5.5H15v3z" />
    </svg>
  )
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.4" cy="7.6" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="7.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M7.5 10.5v6" />
      <path d="M11.5 16.5v-3.8c0-1.2.9-2.2 2-2.2s2 1 2 2.2v3.8" />
      <path d="M11.5 10.8v5.7" />
    </svg>
  )
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
      <path
        d="M8.7 8.4c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4.2.5.6 1.5.7 1.6.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.2.2-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1.2-.2.6-.7.8-.9.2-.2.4-.2.6-.1l1.4.7c.2.1.3.2.4.3 0 .2 0 .9-.4 1.4-.3.4-1.3.9-2.1.8-.9-.1-2.9-.8-4.3-2.4-1.2-1.4-1.9-2.9-2-3.1-.1-.2-.6-.9-.6-1.7 0-.8.4-1.2.6-1.3z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}
