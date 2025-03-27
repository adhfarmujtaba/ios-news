"use client"

import { useContext } from "react"
import { List } from "lucide-react"
import NewsCard from "@/components/news-card"
import { NewsContext } from "@/context/news-context"

export default function NewsList() {
  const { filteredNews } = useContext(NewsContext)

  if (filteredNews.length === 0) {
    return (
      <div className="text-center py-10">
        <List className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No news found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div>
      {filteredNews.map((news) => (
        <NewsCard key={news.slug} news={news} view="list" />
      ))}
    </div>
  )
}

