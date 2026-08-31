import { BookOpen, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react"

export type Project = {
  client: string
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
  image: string
  url: string
}

export const PROJECTS: Project[] = [
  {
    client: "Dr. A Q Khan Hospital",
    title: "Hospital Website Development",
    description:
      "A fast, accessible site that puts patients first — clear department info, doctor profiles, and appointment details built for people who need answers quickly.",
    tags: ["Web Development", "Healthcare"],
    icon: Stethoscope,
    image: "/dr-aq-khan-hospital.jpg",
    url: "https://draqkhanhospital.org",
  },
  {
    client: "Alkaram University",
    title: "Institutional Website Development",
    description:
      "A full institutional platform covering programs, admissions, and campus news — built to handle high traffic during enrollment season without breaking a sweat.",
    tags: ["Web Development", "Education"],
    icon: GraduationCap,
    image: "/alkaram-university.jpg",
    url: "https://akii.edu.pk",
  },
  {
    client: "Uni American Eagles",
    title: "University Enrollment Platform",
    description:
      "A platform that connects prospective students with multiple partner universities, guiding them from program discovery through to enrollment in one streamlined flow.",
    tags: ["Web Development", "Higher Education"],
    icon: BookOpen,
    image: "/uni-american-eagles.png",
    url: "https://uniae-edu.us",
  },
]
