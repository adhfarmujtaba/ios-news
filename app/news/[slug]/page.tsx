import type { Metadata } from "next"
import { getNewsById } from "@/lib/news"
import { notFound } from "next/navigation"
import NewsDetailClient from "./NewsDetailClient"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = getNewsById(params.slug)

  if (!news) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: news.title,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      type: "article",
      publishedTime: news.publishedAt,
      images: [
        {
          url: news.imageUrl || "/placeholder.svg",
          width: 800,
          height: 600,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description,
      images: [news.imageUrl || "/placeholder.svg"],
    },
  }
}

export default function NewsDetailPage({ params }: Props) {
  const news = getNewsById(params.slug)

  if (!news) {
    notFound()
  }

  return <NewsDetailClient news={news} slug={params.slug} />
}

