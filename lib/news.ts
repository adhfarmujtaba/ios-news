import type { NewsItem } from "@/types"
import newsData from "@/data/news.json"

export function getAllNews(): NewsItem[] {
  return newsData
}

export function getNewsById(slug: string): NewsItem | undefined {
  return newsData.find((news) => news.slug === slug)
}

export function getRelatedNews(currentSlug: string, limit = 3): NewsItem[] {
  const currentNews = getNewsById(currentSlug)

  if (!currentNews) return []

  return newsData.filter((news) => news.slug !== currentSlug && news.category === currentNews.category).slice(0, limit)
}

export function getCategories(): string[] {
  const categories = new Set<string>()

  newsData.forEach((news) => {
    if (news.category) {
      categories.add(news.category)
    }
  })

  return Array.from(categories)
}

export async function generateStaticParams() {
  const news = getAllNews()

  return news.map((item) => ({
    slug: item.slug,
  }))
}

