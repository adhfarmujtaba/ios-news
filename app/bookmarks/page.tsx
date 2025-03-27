"use client"

import { useEffect } from "react"
import TabBar from "@/components/tab-bar"
import BookmarkedNewsList from "@/components/bookmarked-news-list"

export default function BookmarksPage() {
  useEffect(() => {
    const mainContainer = document.querySelector(".ios-main-container")
    const handleScroll = () => {
      const header = document.querySelector(".ios-header")
      if (header && mainContainer) {
        if (Math.round(mainContainer.scrollTop) > 0) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      }
    }

    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className="ios-app-container">
      <main className="ios-main-container pb-20">
        <div className="ios-header">
          <h1 className="ios-header-title">Bookmarks</h1>
        </div>

        <div className="px-4">
          <BookmarkedNewsList />
        </div>
      </main>
      <TabBar />
    </div>
  )
}

