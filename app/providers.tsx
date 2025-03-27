"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { NewsProvider } from "@/context/news-context"
import { SettingsProvider } from "@/context/settings-context"
import { BookmarksProvider } from "@/context/bookmarks-context"
import { ReadingHistoryProvider } from "@/context/reading-history-context"
import { AnimatePresence } from "framer-motion"
import { PageTransition } from "@/components/page-transition"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SettingsProvider>
        <BookmarksProvider>
          <ReadingHistoryProvider>
            <NewsProvider>
              <AnimatePresence mode="wait">
                <PageTransition>{children}</PageTransition>
              </AnimatePresence>
            </NewsProvider>
          </ReadingHistoryProvider>
        </BookmarksProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}

