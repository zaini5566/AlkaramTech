"use client"

import { ArrowRight, Bot, Code2, ShoppingCart } from "lucide-react"

import { TiltCard } from "@/components/tilt-card"

// Placeholder posts and gradient cover art — swap for real articles and
// photos once the blog exists.
const POSTS = [
  {
    icon: Code2,
    from: "from-blue-600",
    to: "to-blue-400",
    category: "Web Development",
    date: "12 May 2024",
    title: "5 Signs Your Website Is Costing You Customers",
    excerpt:
      "From slow load times to unclear calls-to-action, small mistakes compound fast. Here's what to fix first.",
  },
  {
    icon: Bot,
    from: "from-cyan-500",
    to: "to-blue-500",
    category: "AI Automation",
    date: "28 Apr 2024",
    title: "How AI Automation Actually Saves Teams Time",
    excerpt:
      "Not every workflow needs a human in the loop. Here's how to tell which repetitive tasks are worth automating first.",
  },
  {
    icon: ShoppingCart,
    from: "from-blue-500",
    to: "to-cyan-400",
    category: "E-commerce",
    date: "15 Apr 2024",
    title: "The Real Cost of Cart Abandonment (And How to Fix It)",
    excerpt:
      "Most stores lose more revenue at checkout than anywhere else in the funnel. A few targeted changes recover a meaningful share of it.",
  },
]

export function BlogSection() {
  return (
    <section
      id="blog"
      className="relative flex flex-col justify-center overflow-hidden bg-background py-14 sm:py-16 lg:min-h-svh lg:py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-px w-4 bg-muted-foreground" />
              News &amp; Blogs
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Our Latest <span className="text-blue-600 italic">News &amp; Blogs</span>
            </h2>
          </div>

          <a
            href="#"
            className="group inline-flex shrink-0 items-center rounded-full bg-blue-950 py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors hover:bg-blue-900"
          >
            View All Blogs
            <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400">
              <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <TiltCard key={post.title} className="bg-card">
              <div className="flex h-full flex-col">
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${post.from} ${post.to}`}
                >
                  <post.icon className="h-14 w-14 text-white/20" strokeWidth={1.25} />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <a
                    href="#"
                    className="group/link mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-blue-700 hover:text-blue-800"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
