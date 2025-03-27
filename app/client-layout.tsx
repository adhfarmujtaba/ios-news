'use client'

import type React from "react"
import { Providers } from "./providers"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function DynamicThemeColorHandler() {
  const { theme } = useTheme()
  const [themeColor, setThemeColor] = useState<string>("#f7f7f7")

  useEffect(() => {
    // Determine theme color based on current theme
    const determineThemeColor = () => {
      switch(theme) {
        case 'light':
          return "#f7f7f7"
        case 'dark':
          return "#121212"
        case 'system':
          // Use media query to determine system preference
          return window.matchMedia('(prefers-color-scheme: dark)').matches
             ? "#121212"
             : "#f7f7f7"
        default:
          return "#f7f7f7"
      }
    }

    const color = determineThemeColor()
    setThemeColor(color)

    // Update meta theme-color tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = color
      document.head.appendChild(meta)
    }
  }, [theme])

  return null
}

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <DynamicThemeColorHandler />
      {children}
    </Providers>
  )
}