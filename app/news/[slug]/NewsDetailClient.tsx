"use client"

import { useEffect, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, Volume2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import RelatedNews from "@/components/related-news"
import { formatReadTime } from "@/lib/utils"
import TabBar from "@/components/tab-bar"
import { BookmarkButton } from "@/components/bookmark-button"
import { ReadingHistoryContext } from "@/context/reading-history-context"
import { motion } from "framer-motion"
import type { NewsItem } from "@/types"
import { Suspense } from "react"

interface NewsDetailClientProps {
  news: NewsItem
  slug: string
}

export default function NewsDetailClient({ news, slug }: NewsDetailClientProps) {
  const { addToHistory } = useContext(ReadingHistoryContext)
  const readTime = formatReadTime(news.content)

  useEffect(() => {
    // Add to reading history when article is viewed
    if (slug) {
      addToHistory(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]) // Only depend on slug, not on addToHistory

  return (
    <div className="ios-app-container">
      <main className="ios-main-container pb-20">
        <div className="ios-nav-header">
          <Link href="/" className="ios-back-button">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <div className="ios-nav-title truncate">{news.title}</div>
          <div className="ios-nav-actions">
            <button className="ios-nav-button">
              <Share2 className="h-5 w-5" />
            </button>
            <BookmarkButton newsSlug={slug} />
          </div>
        </div>

        <motion.div
          className="px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="ios-article-meta">
            <span className="ios-category-pill">{news.category}</span>
            <span className="ios-read-time">{readTime} min read</span>
            <span className="ios-views">{news.views} views</span>
          </div>

          <h1 className="ios-article-title">{news.title}</h1>

          <motion.div
            className="ios-article-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Image
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              fill
              className="ios-article-image"
              priority
            />
          </motion.div>

          <motion.div
            className="ios-article-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {news.content}
          </motion.div>

          <div className="ios-listen-button-container">
            <button className="ios-listen-button">
              <Volume2 className="h-5 w-5 mr-2" />
              Listen to Article
            </button>
          </div>

          <Separator className="ios-separator" />

          <section className="ios-related-section">
            <h2 className="ios-section-title">Related News</h2>
            <Suspense
              fallback={
                <div className="ios-loading-indicator">
                  <div className="ios-spinner"></div>
                </div>
              }
            >
              <RelatedNews currentSlug={slug} />
            </Suspense>
          </section>
        </motion.div>
      </main>
      <TabBar />
    </div>
  )
}

