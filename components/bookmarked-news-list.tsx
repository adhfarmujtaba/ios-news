"use client"

import { useContext } from "react"
import { Bookmark } from "lucide-react"
import { BookmarksContext } from "@/context/bookmarks-context"
import NewsCard from "@/components/news-card"
import { SettingsContext } from "@/context/settings-context"

export default function BookmarkedNewsList() {
  const { bookmarkedNews } = useContext(BookmarksContext)
  const { settings } = useContext(SettingsContext)

  if (bookmarkedNews.length === 0) {
    return (
      <div className="ios-empty-state">
        <Bookmark className="ios-empty-icon" />
        <h3 className="ios-empty-title">No bookmarks yet</h3>
        <p className="ios-empty-description">Save articles to read later by tapping the bookmark icon.</p>
      </div>
    )
  }

  return (
    <div className={settings.defaultView === "grid" ? "ios-grid-layout" : "ios-list-layout"}>
      {bookmarkedNews.map((news) => (
        <NewsCard key={news.slug} news={news} view={settings.defaultView} />
      ))}
    </div>
  )
}

