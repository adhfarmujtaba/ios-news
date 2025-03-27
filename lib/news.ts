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

export function getTrendingNews(limit = 5): NewsItem[] {
  return newsData
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getForYouNews(limit = 10): NewsItem[] {
  // In a real app, this would be personalized based on user preferences
  return newsData.slice(0, limit);
}

export function getFollowingNews(limit = 5): NewsItem[] {
  // In a real app, this would be based on followed sources/authors
  return newsData.filter(news => 
    ["Sarah Tech", "Green Reporter"].includes(news.author)
  ).slice(0, limit);
}