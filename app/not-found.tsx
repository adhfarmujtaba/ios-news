import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="ios-app-container">
      <main className="ios-main-container flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-16 w-16 text-[hsl(var(--ios-blue))] mb-6" />
        <h1 className="text-2xl font-bold text-[hsl(var(--ios-text-primary))] mb-2">Page Not Found</h1>
        <p className="text-[hsl(var(--ios-text-secondary))] mb-8 text-center">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="ios-listen-button">
          Return to Home
        </Link>
      </main>
    </div>
  )
}

