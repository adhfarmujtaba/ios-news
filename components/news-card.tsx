"use client"

import Image from "next/image"
import { Clock, Eye } from "lucide-react"
import { formatReadTime } from "@/lib/utils"
import type { NewsItem } from "@/types"
import { BookmarkButton } from "./bookmark-button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface NewsCardProps {
  news: NewsItem
  view: "grid" | "list"
}

export default function NewsCard({ news, view }: NewsCardProps) {
  const readTime = formatReadTime(news.content)
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  const handleCardClick = () => {
    setIsPressed(true)
    setTimeout(() => {
      router.push(`/news/${news.slug}`)
    }, 150) // Small delay for the animation to be visible
  }

  if (view === "list") {
    return (
      <div className={`ios-list-card ${isPressed ? "ios-card-pressed" : ""}`} onClick={handleCardClick}>
        <div className="ios-list-card-content">
          <div className="ios-list-card-image-container">
            <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="ios-list-card-image" />
          </div>
          <div className="ios-list-card-body">
            <span className="ios-category-pill">{news.category}</span>
            <h3 className="ios-card-title">{news.title}</h3>
            <p className="ios-card-description">{news.description}</p>
            <div className="ios-card-meta">
              <div className="ios-meta-item">
                <Clock className="ios-meta-icon" />
                <span>{readTime} min</span>
              </div>
              <div className="ios-meta-item">
                <Eye className="ios-meta-icon" />
                <span>{news.views}</span>
              </div>
              <BookmarkButton newsSlug={news.slug} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`ios-grid-card ${isPressed ? "ios-card-pressed" : ""}`} onClick={handleCardClick}>
      <div className="ios-grid-card-image-container">
        <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="ios-grid-card-image" />
        <span className="ios-category-pill-overlay">{news.category}</span>
      </div>
      <div className="ios-grid-card-content">
        <h3 className="ios-grid-card-title">{news.title}</h3>
        <p className="ios-grid-card-description">{news.description}</p>
        <div className="ios-grid-card-meta">
          <div className="ios-meta-item">
            <Clock className="ios-meta-icon" />
            <span>{readTime} min</span>
          </div>
          <div className="ios-meta-item">
            <Eye className="ios-meta-icon" />
            <span>{news.views}</span>
          </div>
          <BookmarkButton newsSlug={news.slug} />
        </div>
      </div>
    </div>
  )
}

