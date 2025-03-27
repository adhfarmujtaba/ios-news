"use client"

import type React from "react"

import { useContext } from "react"
import { BookmarkPlus, BookmarkCheck } from "lucide-react"
import { BookmarksContext } from "@/context/bookmarks-context"

interface BookmarkButtonProps {
  newsSlug: string
  className?: string
}

export function BookmarkButton({ newsSlug, className = "" }: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useContext(BookmarksContext)

  const isBookmarkedNews = isBookmarked(newsSlug)

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the card click event
    if (isBookmarkedNews) {
      removeBookmark(newsSlug)
    } else {
      addBookmark(newsSlug)
    }
  }

  return (
    <button
      className={`ios-bookmark-button ${className}`}
      onClick={toggleBookmark}
      aria-label={isBookmarkedNews ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarkedNews ? (
        <BookmarkCheck className="ios-bookmark-icon" />
      ) : (
        <BookmarkPlus className="ios-bookmark-icon" />
      )}
    </button>
  )
}

