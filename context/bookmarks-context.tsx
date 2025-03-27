"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import type { NewsItem } from "@/types"

interface BookmarksContextType {
  bookmarks: string[]
  addBookmark: (newsId: string) => void
  removeBookmark: (newsId: string) => void
  isBookmarked: (newsId: string) => boolean
  bookmarkedNews: NewsItem[]
}

export const BookmarksContext = createContext<BookmarksContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
  bookmarkedNews: [],
})

interface BookmarksProviderProps {
  children: React.ReactNode
}

export function BookmarksProvider({ children }: BookmarksProviderProps) {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [bookmarkedNews, setBookmarkedNews] = useState<NewsItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem("newsAppBookmarks")
    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks)
        setBookmarks(parsedBookmarks)
      } catch (error) {
        console.error("Failed to parse saved bookmarks:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      // Save to localStorage when bookmarks change
      localStorage.setItem("newsAppBookmarks", JSON.stringify(bookmarks))

      // Load bookmarked news items
      if (bookmarks.length > 0) {
        import("@/lib/news").then(({ getAllNews }) => {
          const allNews = getAllNews()
          const bookmarkedItems = allNews.filter((news) => bookmarks.includes(news.slug))
          setBookmarkedNews(bookmarkedItems)
        })
      } else {
        setBookmarkedNews([])
      }
    }
  }, [bookmarks, isClient])

  const addBookmark = (newsId: string) => {
    if (!bookmarks.includes(newsId)) {
      setBookmarks((prev) => [...prev, newsId])
    }
  }

  const removeBookmark = (newsId: string) => {
    setBookmarks((prev) => prev.filter((id) => id !== newsId))
  }

  const isBookmarked = (newsId: string) => {
    return bookmarks.includes(newsId)
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        bookmarkedNews,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}

