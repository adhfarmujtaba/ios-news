"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Bookmark, Settings, History } from "lucide-react"

export default function TabBar() {
  const pathname = usePathname()

  return (
    <div className="ios-tab-bar">
      <Link href="/" className={`ios-tab-item ${pathname === "/" ? "ios-tab-active" : ""}`}>
        <Home className="ios-tab-icon" />
        <span className="ios-tab-label">Home</span>
      </Link>
      <Link href="/search" className={`ios-tab-item ${pathname === "/search" ? "ios-tab-active" : ""}`}>
        <Search className="ios-tab-icon" />
        <span className="ios-tab-label">Discover</span>
      </Link>
      <Link href="/bookmarks" className={`ios-tab-item ${pathname === "/bookmarks" ? "ios-tab-active" : ""}`}>
        <Bookmark className="ios-tab-icon" />
        <span className="ios-tab-label">Bookmarks</span>
      </Link>
      <Link href="/history" className={`ios-tab-item ${pathname === "/history" ? "ios-tab-active" : ""}`}>
        <History className="ios-tab-icon" />
        <span className="ios-tab-label">History</span>
      </Link>
      <Link href="/settings" className={`ios-tab-item ${pathname === "/settings" ? "ios-tab-active" : ""}`}>
        <Settings className="ios-tab-icon" />
        <span className="ios-tab-label">Settings</span>
      </Link>
    </div>
  )
}

