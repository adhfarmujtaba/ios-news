import type { MetadataRoute } from "next"
import { getAllNews } from "@/lib/news"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ios-news-app.vercel.app"
  const news = getAllNews()

  const newsUrls = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...newsUrls,
  ]
}

