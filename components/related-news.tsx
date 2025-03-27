import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getRelatedNews } from "@/lib/news"

interface RelatedNewsProps {
  currentSlug: string
}

export default function RelatedNews({ currentSlug }: RelatedNewsProps) {
  const relatedNews = getRelatedNews(currentSlug, 3)

  if (relatedNews.length === 0) {
    return <div>No related news found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedNews.map((news) => (
        <Card key={news.slug} className="overflow-hidden">
          <div className="relative aspect-video w-full">
            <Image src={news.imageUrl || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <Link href={`/news/${news.slug}`} className="hover:underline">
              <h3 className="font-semibold line-clamp-2">{news.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{news.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

