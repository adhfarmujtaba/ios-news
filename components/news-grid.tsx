"use client"

import { useContext } from "react"
import { Grid } from "lucide-react"
import NewsCard from "@/components/news-card"
import { NewsContext } from "@/context/news-context"
import { SettingsContext } from "@/context/settings-context"

export default function NewsGrid() {
  const { filteredNews } = useContext(NewsContext)
  const { settings } = useContext(SettingsContext)

  if (filteredNews.length === 0) {
    return (
      <div className="ios-empty-state">
        <Grid className="ios-empty-icon" />
        <h3 className="ios-empty-title">No news found</h3>
        <p className="ios-empty-description">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <div className={settings.defaultView === "grid" ? "ios-grid-layout" : "ios-list-layout"}>
      {filteredNews.map((news) => (
        <NewsCard key={news.slug} news={news} view={settings.defaultView} />
      ))}
    </div>
  )
}

