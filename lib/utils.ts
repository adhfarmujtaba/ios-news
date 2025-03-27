import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatReadTime(content: string): number {
  // Average reading speed: 200 words per minute
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)
  return Math.max(1, readTime) // Minimum 1 minute read time
}

