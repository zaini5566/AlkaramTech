import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A bare "#section" href only resolves correctly on the page that actually
// contains that section (the homepage). From anywhere else it needs the "/"
// prefix so the browser navigates home first, then jumps to the hash.
export function sectionHref(hash: string, pathname: string) {
  return pathname === "/" ? hash : `/${hash}`
}
