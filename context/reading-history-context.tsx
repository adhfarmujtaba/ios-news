"use client"

import type React from "react"
import { createContext, useState, useEffect, useMemo } from "react"
import type { NewsItem } from "@/types"

interface ReadingHistoryItem {
  slug: string
  timestamp: number
}

interface ReadingHistoryContextType {
  history: ReadingHistoryItem[]
  historyItems: NewsItem[]
  addToHistory: (slug: string) => void
  clearHistory: () => void
  removeFromHistory: (slug: string) => void
}

export const ReadingHistoryContext = createContext<ReadingHistoryContextType>({
  history: [],
  historyItems: [],
  addToHistory: () => {},
  clearHistory: () => {},
  removeFromHistory: () => {},
})

interface ReadingHistoryProviderProps {
  children: React.ReactNode
}

export function ReadingHistoryProvider({ children }: ReadingHistoryProviderProps) {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([])
  const [historyItems, setHistoryItems] = useState<NewsItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load history from localStorage
    const savedHistory = localStorage.getItem("newsAppReadingHistory")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        setHistory(parsedHistory)
      } catch (error) {
        console.error("Failed to parse saved reading history:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      try {
        // Save to localStorage when history changes
        localStorage.setItem("newsAppReadingHistory", JSON.stringify(history))

        // Load history news items
        if (history.length > 0) {
          const loadHistoryItems = async () => {
            const { getAllNews } = await import("@/lib/news")
            const allNews = getAllNews()
            const slugs = history.map((item) => item.slug)
            const historyNews = allNews.filter((news) => slugs.includes(news.slug))

            // Sort by timestamp (most recent first)
            historyNews.sort((a, b) => {
              const aTimestamp = history.find((item) => item.slug === a.slug)?.timestamp || 0
              const bTimestamp = history.find((item) => item.slug === b.slug)?.timestamp || 0
              return bTimestamp - aTimestamp
            })

            setHistoryItems(historyNews)
          }

          loadHistoryItems()
        } else {
          setHistoryItems([])
        }
      } catch (error) {
        console.error("Error updating reading history:", error)
      }
    }
  }, [history, isClient])

  const addToHistory = (slug: string) => {
    setHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.slug !== slug)
      // Add to the beginning with current timestamp
      return [{ slug, timestamp: Date.now() }, ...filtered]
    })
  }

  const removeFromHistory = (slug: string) => {
    setHistory((prev) => prev.filter((item) => item.slug !== slug))
  }

  const clearHistory = () => {
    setHistory([])
  }

  const contextValue = useMemo(
    () => ({
      history,
      historyItems,
      addToHistory,
      clearHistory,
      removeFromHistory,
    }),
    [history, historyItems],
  )

  return <ReadingHistoryContext.Provider value={contextValue}>{children}</ReadingHistoryContext.Provider>
}

