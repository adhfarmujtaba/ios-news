"use client"

import { useContext } from "react"
import { Trophy } from "lucide-react"
import NewsCard from "@/components/news-card"
import { NewsContext } from "@/context/news-context"
import { SettingsContext } from "@/context/settings-context"

export default function TrendingNews() {
  const { filteredNews } = useContext(NewsContext)
  const { settings } = useContext(SettingsContext)

  if (filteredNews.length === 0) {
    return (
      <div className="ios-empty-state">
        <Trophy className="ios-empty-icon" />
        <h3 className="ios-empty-title">No trending news</h3>
        <p className="ios-empty-description">Check back later for the latest trending stories.</p>
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
            <div className="text-sm text-gray-500 flex items-center">
              <span className="mr-2">📈 {news.views} Views</span>
            </div>
          }
        />
      ))}
    </div>
  )
}