"use client"

import { useContext } from "react"
import { Users } from "lucide-react"
import NewsCard from "@/components/news-card"
import { NewsContext } from "@/context/news-context"
import { SettingsContext } from "@/context/settings-context"

export default function FollowingNews() {
  const { filteredNews } = useContext(NewsContext)
  const { settings } = useContext(SettingsContext)

  if (filteredNews.length === 0) {
    return (
      <div className="ios-empty-state">
        <Users className="ios-empty-icon" />
        <h3 className="ios-empty-title">No news from followed sources</h3>
        <p className="ios-empty-description">Start following authors or sources to see their latest news.</p>
      </div>
    )
  }

  return (
    <div className={settings.defaultView === "grid" ? "ios-grid-layout" : "ios-list-layout"}>
      {filteredNews.map((news) => (
        <NewsCard 
          key={news.slug} 
          news={news} 
          view={settings.defaultView}
          additionalInfo={
            <div className="text-sm text-gray-500">
              By {news.author}
            </div>
          }
        />
      ))}
    </div>
  )
}