import {
  Bot,
  Code2,
  Megaphone,
  ShoppingCart,
  Gauge,
  Palette,
  Smartphone,
  Search,
  ShieldCheck,
  Users,
  Target,
  Calendar,
  BarChart3,
  MessageSquare,
  Workflow,
  Plug,
  Bug,
  LineChart,
  CreditCard,
  Package,
  Boxes,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

export type ServicePoint = {
  icon: LucideIcon
  title: string
  description: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type ServiceFaq = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  label: string
  shortDescription: string
  headline: string
  headlineAccent: string
  tagline: string
  closingHeadline: string
  accent: string
  icon: LucideIcon
  painPoints: ServicePoint[]
  deliverables: ServicePoint[]
  process: ProcessStep[]
  differentiators: ServicePoint[]
  faqs: ServiceFaq[]
  showcaseProjects: boolean
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    label: "Web Development",
    shortDescription:
      "Custom websites and web apps engineered for speed, conversions, and scale.",
    headline: "Websites Built To",
    headlineAccent: "Convert",
    tagline:
      "Not just a pretty homepage — a site engineered around one goal: turning visitors into customers.",
    closingHeadline: "Ready for a site that actually converts?",
    accent: "#1d4ed8",
    icon: Code2,
    painPoints: [
      {
        icon: Gauge,
        title: "Slow sites lose visitors",
        description:
          "Every extra second of load time is another visitor who leaves before seeing what you offer.",
      },
      {
        icon: Palette,
        title: "Outdated design erodes trust",
        description:
          "A site that looks like it's from 2015 makes people question whether your business is still active.",
      },
      {
        icon: Smartphone,
        title: "Confusing on mobile",
        description:
          "Most of your traffic is on a phone — if the experience breaks there, you're losing most of your audience.",
      },
    ],
    deliverables: [
      {
        icon: Palette,
        title: "Custom design, not a template",
        description: "A site designed around your brand and your customers, not a recycled theme.",
      },
      {
        icon: Smartphone,
        title: "Fully responsive",
        description: "Looks and works exactly right on every screen, from a phone to a wide desktop.",
      },
      {
        icon: Gauge,
        title: "Built for speed",
        description: "Optimized load times so visitors see your site, not a loading spinner.",
      },
      {
        icon: Search,
        title: "SEO-ready structure",
        description: "Clean markup and metadata so search engines can actually find and rank you.",
      },
      {
        icon: ShieldCheck,
        title: "You own everything",
        description: "The code, the content, the domain — it's yours, with no vendor lock-in.",
      },
      {
        icon: Users,
        title: "Easy to update",
        description: "A simple way to edit content yourself once we hand it over, no developer required.",
      },
    ],
    process: [
      {
        title: "Discovery call",
        description:
          "We learn about your business, your customers, and what the site actually needs to accomplish.",
      },
      {
        title: "Design & wireframes",
        description:
          "We map out the structure and look before writing a line of code, so there are no surprises later.",
      },
      {
        title: "Build",
        description:
          "We develop the site with modern, maintainable code — you'll see progress along the way, not just a final reveal.",
      },
      {
        title: "Testing & launch",
        description:
          "Cross-device testing, performance checks, and a smooth go-live with nothing broken.",
      },
      {
        title: "Support after launch",
        description:
          "We stick around to fix, tune, and help you grow the site after it's live.",
      },
    ],
    differentiators: [
      {
        icon: MessageSquare,
        title: "You talk to the people building it",
        description: "No account managers relaying messages — direct access to the developers on your project.",
      },
      {
        icon: Target,
        title: "Every decision serves conversion",
        description: "Design choices are made to move visitors toward action, not just to look nice.",
      },
      {
        icon: Calendar,
        title: "Clear timelines",
        description: "You'll know what's happening and when — no radio silence for weeks at a time.",
      },
    ],
    faqs: [
      {
        question: "How long does a typical website take?",
        answer:
          "It depends on scope — a focused business site moves faster than a large platform with custom features. After the discovery call, we'll give you a clear timeline before any work starts.",
      },
      {
        question: "Do I need to provide the content and images?",
        answer:
          "You can, or we can help write and source what's needed. We'll tell you exactly what we need from you upfront so there's no back-and-forth guessing.",
      },
      {
        question: "I already have a website — can you improve it instead of rebuilding?",
        answer:
          "Often, yes. We'll audit what's there first and recommend whether a redesign or a rebuild actually makes sense for your situation.",
      },
      {
        question: "What happens after the site goes live?",
        answer:
          "You get a walkthrough of how to manage it yourself, plus we're available for ongoing support, fixes, or new features whenever you need them.",
      },
    ],
    showcaseProjects: true,
  },
  {
    slug: "social-media-marketing",
    label: "Social Media Marketing",
    shortDescription:
      "Content strategy and campaigns that turn followers into paying customers.",
    headline: "Content That Turns Followers Into",
    headlineAccent: "Customers",
    tagline:
      "A real strategy behind every post — not just a content calendar filling up space.",
    closingHeadline: "Ready for content that actually converts?",
    accent: "#0ea5e9",
    icon: Megaphone,
    painPoints: [
      {
        icon: Calendar,
        title: "Posting without a plan",
        description:
          "Content going out with no strategy behind it rarely turns into anything measurable.",
      },
      {
        icon: BarChart3,
        title: "Engagement that doesn't convert",
        description:
          "Likes and follows feel good, but if they're not moving people toward a sale, they're just numbers.",
      },
      {
        icon: Users,
        title: "Inconsistent brand voice",
        description:
          "When every post feels different, your audience never quite figures out who you are.",
      },
    ],
    deliverables: [
      {
        icon: Target,
        title: "Content strategy & calendar",
        description: "A plan built around your actual business goals, not just what's trending.",
      },
      {
        icon: Palette,
        title: "Platform-specific content",
        description: "Content designed for how each platform actually works, not one post reused everywhere.",
      },
      {
        icon: MessageSquare,
        title: "Community management",
        description: "Comments and messages handled promptly, so engagement doesn't go answered.",
      },
      {
        icon: BarChart3,
        title: "Performance reporting",
        description: "Regular reporting on what's working, in plain language — not a wall of raw numbers.",
      },
    ],
    process: [
      {
        title: "Brand & audience audit",
        description: "We learn who your audience is and how your brand currently shows up online.",
      },
      {
        title: "Strategy & content plan",
        description: "A content plan built around your goals — awareness, leads, or direct sales.",
      },
      {
        title: "Content production",
        description: "Content created and scheduled, kept consistent with your brand voice.",
      },
      {
        title: "Publishing & engagement",
        description: "Posts go live and your community gets a real, timely response.",
      },
      {
        title: "Reporting & iteration",
        description: "We review what's working and adjust the strategy instead of repeating what isn't.",
      },
    ],
    differentiators: [
      {
        icon: Target,
        title: "Built around your goals",
        description: "Every post is working toward something specific, not just filling a calendar.",
      },
      {
        icon: BarChart3,
        title: "Decisions backed by data",
        description: "We adjust strategy based on what's actually performing, not guesswork.",
      },
      {
        icon: MessageSquare,
        title: "You're never in the dark",
        description: "Regular check-ins and reporting, so you always know what's happening and why.",
      },
    ],
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer:
          "We focus on whichever platforms your actual customers use — that's part of what we figure out together during the strategy phase, rather than spreading effort thin across everything.",
      },
      {
        question: "Do you handle paid ads too?",
        answer:
          "Yes, we can fold paid campaigns into the strategy where it makes sense for your goals and budget.",
      },
      {
        question: "How do you measure success?",
        answer:
          "It depends on your goals — that might be engagement, website traffic, leads, or direct sales. We define what matters upfront so reporting actually means something.",
      },
      {
        question: "Can I still post myself sometimes?",
        answer:
          "Of course — we work as an extension of your team, not a replacement for your voice.",
      },
    ],
    showcaseProjects: false,
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    shortDescription:
      "Intelligent workflows that handle the busywork, freeing your team for growth.",
    headline: "Automate The Busywork,",
    headlineAccent: "Free Your Team",
    tagline:
      "Intelligent workflows that handle repetitive tasks so your team can focus on work that actually grows the business.",
    closingHeadline: "Ready to get those hours back?",
    accent: "#2563eb",
    icon: Bot,
    painPoints: [
      {
        icon: Workflow,
        title: "Hours lost to manual work",
        description:
          "Repetitive data entry and copy-pasting between tools eats hours every week that could go toward growth.",
      },
      {
        icon: Plug,
        title: "Tools that don't talk to each other",
        description:
          "Your team ends up doing the connecting work by hand because your software doesn't.",
      },
      {
        icon: Bug,
        title: "Manual processes, manual mistakes",
        description:
          "Every manual step is a chance for something to be typed wrong or forgotten entirely.",
      },
    ],
    deliverables: [
      {
        icon: Search,
        title: "Workflow audit",
        description: "We map your current process to find exactly where automation actually helps.",
      },
      {
        icon: Workflow,
        title: "Custom automation build",
        description: "Automations built around the tools you already use, not a rip-and-replace.",
      },
      {
        icon: Bot,
        title: "AI-powered processes",
        description: "From chatbots to data pipelines, wherever AI can genuinely save your team time.",
      },
      {
        icon: ShieldCheck,
        title: "Documentation & handover",
        description: "Clear documentation so your team understands exactly what's automated and why.",
      },
    ],
    process: [
      {
        title: "Process audit",
        description: "We look at how your team actually works today to find the real bottlenecks.",
      },
      {
        title: "Automation roadmap",
        description: "A prioritized plan for what to automate first, based on time saved versus effort.",
      },
      {
        title: "Build & integrate",
        description: "We build the automation, connected to the tools your team already relies on.",
      },
      {
        title: "Test & refine",
        description: "Real-world testing to catch edge cases before it's running your actual workflow.",
      },
      {
        title: "Monitor & support",
        description: "We keep an eye on it after launch and adjust as your process evolves.",
      },
    ],
    differentiators: [
      {
        icon: Target,
        title: "Starts with your workflow",
        description: "We automate how your team actually works, not a generic template.",
      },
      {
        icon: Plug,
        title: "Works with what you have",
        description: "Built on top of your existing tools wherever possible, not a forced migration.",
      },
      {
        icon: ShieldCheck,
        title: "Nothing is a black box",
        description: "You'll know exactly what's automated, how, and why — fully documented.",
      },
    ],
    faqs: [
      {
        question: "What kinds of tasks can actually be automated?",
        answer:
          "Anything repetitive and rule-based is a good candidate — data entry, notifications, report generation, lead routing, and more. We'll tell you honestly if something isn't a good fit for automation.",
      },
      {
        question: "Will this replace people on my team?",
        answer:
          "The goal is to remove the repetitive work so your team can spend time on things that actually need a human — strategy, relationships, and judgment calls.",
      },
      {
        question: "What if our tools change later?",
        answer:
          "We document everything clearly, so updating an automation when a tool changes is a straightforward adjustment, not a rebuild from scratch.",
      },
      {
        question: "Do we need technical staff to maintain this?",
        answer:
          "No — we hand it over with documentation your team can follow, and we're available for support if something needs adjusting.",
      },
    ],
    showcaseProjects: false,
  },
  {
    slug: "ecommerce-strategy",
    label: "E-commerce Strategy",
    shortDescription:
      "End-to-end online store builds that convert browsers into loyal buyers.",
    headline: "Online Stores Built To",
    headlineAccent: "Sell",
    tagline:
      "End-to-end e-commerce builds focused on getting people through checkout, not just onto your site.",
    closingHeadline: "Ready to stop losing sales at checkout?",
    accent: "#06b6d4",
    icon: ShoppingCart,
    painPoints: [
      {
        icon: CreditCard,
        title: "High cart abandonment",
        description:
          "A clunky or confusing checkout is often the difference between a sale and an empty cart.",
      },
      {
        icon: Boxes,
        title: "Inventory chaos",
        description:
          "Orders and stock managed across disconnected spreadsheets and platforms leads to costly mistakes.",
      },
      {
        icon: LineChart,
        title: "Traffic that doesn't convert",
        description:
          "Visitors are landing on your store, but the path from browsing to buying isn't working.",
      },
    ],
    deliverables: [
      {
        icon: Palette,
        title: "Store design & build",
        description: "A storefront designed around how people actually shop, not just how it looks.",
      },
      {
        icon: CreditCard,
        title: "Optimized checkout flow",
        description: "A streamlined path to purchase with as few points of friction as possible.",
      },
      {
        icon: Plug,
        title: "Payment & shipping setup",
        description: "Integrated payment gateways and shipping options that fit how you sell.",
      },
      {
        icon: Package,
        title: "Inventory & order management",
        description: "Stock and orders tracked in one place instead of scattered spreadsheets.",
      },
    ],
    process: [
      {
        title: "Store audit & strategy",
        description: "We look at your products, customers, and current setup to find what's holding sales back.",
      },
      {
        title: "Design & build",
        description: "The storefront is designed and built around a clear path to checkout.",
      },
      {
        title: "Payments & logistics",
        description: "Payment processing and shipping are integrated and tested end to end.",
      },
      {
        title: "Testing",
        description: "Every step of the buying journey is tested before real customers see it.",
      },
      {
        title: "Launch & optimize",
        description: "We launch, then keep refining based on how real customers actually shop.",
      },
    ],
    differentiators: [
      {
        icon: TrendingUp,
        title: "Every decision serves conversion",
        description: "Layout, copy, and checkout flow are all judged by whether they help people buy.",
      },
      {
        icon: Boxes,
        title: "Built to scale with your catalog",
        description: "Whether you have ten products or ten thousand, the store is built to grow with you.",
      },
      {
        icon: LineChart,
        title: "We don't disappear after launch",
        description: "Post-launch optimization based on real customer behavior, not a one-time handoff.",
      },
    ],
    faqs: [
      {
        question: "Which e-commerce platform do you use?",
        answer:
          "We choose the platform that actually fits your catalog, budget, and growth plans — Shopify, WooCommerce, or a custom build — rather than defaulting to one option for everyone.",
      },
      {
        question: "Can you migrate my existing store?",
        answer:
          "Yes — we can migrate products, orders, and customer data from your current platform with minimal disruption to sales.",
      },
      {
        question: "Do you handle payment gateway setup?",
        answer:
          "Yes, integrating and testing payment and shipping options is part of the build, not an extra step you're left to figure out.",
      },
      {
        question: "What if I only have a few products right now?",
        answer:
          "That's fine — the store is built to scale, so it grows with your catalog instead of needing to be rebuilt later.",
      },
    ],
    showcaseProjects: false,
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug)
}
