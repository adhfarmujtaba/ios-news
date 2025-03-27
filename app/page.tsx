"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import CategoryFilter from "@/components/category-filter"
import TabBar from "@/components/tab-bar"
import PullToRefresh from "@/components/pull-to-refresh"
import NewsGrid from "@/components/news-grid"
import TrendingNews from "@/components/trending-news"
import FollowingNews from "@/components/following-news"
import { ViewToggle } from "@/components/view-toggle"
import { NewsProvider } from "@/context/news-context"
import { SettingsProvider } from "@/context/settings-context"
import { 
  getForYouNews, 
  getTrendingNews, 
  getFollowingNews 
} from "@/lib/news"

const WeatherWidget = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-800">San Francisco</h2>
        <p className="text-gray-500">Cloudy</p>
      </div>
      <div className="text-3xl font-bold text-blue-600">
        88°
      </div>
    </div>
  )
}

const SegmentControl = ({ segments, activeSegment, onSegmentChange }) => {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-4 m-5">
      {segments.map((segment) => (
        <button
          key={segment.id}
          onClick={() => onSegmentChange(segment.id)}
          className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 ${
            activeSegment === segment.id 
              ? 'bg-white shadow-sm text-black rounded-lg' 
              : 'text-gray-500 hover:bg-gray-00'
          }`}
        >
          {segment.label}
        </button>
      ))}
    </div>
  )
}

export default function Home() {
  const [activeSegment, setActiveSegment] = useState("foryou")
  const [isScrolled, setIsScrolled] = useState(false)
  const [previousSegment, setPreviousSegment] = useState(null)
  const mainContainerRef = useRef(null)
  const router = useRouter()
  
  // Use useMemo to ensure consistent featured news selection during SSR and CSR
  const featuredNews = useMemo(() => {
    const newsItems = getForYouNews(10)
    return newsItems[Math.floor(newsItems.length / 2)]; // Use a stable index
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        setIsScrolled(mainContainerRef.current.scrollTop > 10)
      }
    }

    const container = mainContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Custom segment change handler to track previous segment
  const handleSegmentChange = (newSegment) => {
    setPreviousSegment(activeSegment)
    setActiveSegment(newSegment)
  }

  const renderContent = () => {
    const segments = [
      { id: "foryou", label: "For You" },
      { id: "following", label: "Following" },
      { id: "trending", label: "Trending" }
    ]

    // Determine animation direction based on segment order
    const segmentOrder = ["foryou", "following", "trending"]
    const currentIndex = segmentOrder.indexOf(activeSegment)
    const previousIndex = segmentOrder.indexOf(previousSegment)
    const isMovingRight = currentIndex > previousIndex
    
    const segmentVariants = {
      initial: { 
        opacity: 0, 
        x: isMovingRight ? 50 : -50 
      },
      animate: { 
        opacity: 1, 
        x: 0 
      },
      exit: { 
        opacity: 0, 
        x: isMovingRight ? -50 : 50 
      }
    }

    const renderSegmentContent = () => {
      switch(activeSegment) {
        case "foryou":
          return (
            <div className="px-4 py-2">
              <WeatherWidget />
              
              {featuredNews && (
                <div 
                  onClick={() => router.push(`/news/${featuredNews.slug}`)}
                  className="bg-white shadow-md rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                >
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Recommended</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-grow pr-2">
                      <p className="text-base font-medium text-gray-900 line-clamp-2">
                        {featuredNews.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {featuredNews.description}
                      </p>
                    </div>
                    {featuredNews.imageUrl && (
                      <img 
                        src={featuredNews.imageUrl} 
                        alt={featuredNews.title} 
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                    )}
                  </div>
                </div>
              )}

              <CategoryFilter className="mb-6" />
              
              <div className="mb-4 flex justify-end items-end">
                <ViewToggle />
              </div>
              
              <NewsProvider initialNews={getForYouNews()}>
                <NewsGrid />
              </NewsProvider>
            </div>
          )
        case "following":
          return (
            <div className="px-4 py-2">
              <NewsProvider initialNews={getFollowingNews()}>
                <FollowingNews />
              </NewsProvider>
            </div>
          )
        case "trending":
          return (
            <div className="px-4 py-2">
              <NewsProvider initialNews={getTrendingNews()}>
                <TrendingNews />
              </NewsProvider>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div>
        <div className="mb-4">
          <SegmentControl 
            segments={segments}
            activeSegment={activeSegment}
            onSegmentChange={handleSegmentChange}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSegment}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={segmentVariants}
            transition={{ duration: 0.3 }}
          >
            {renderSegmentContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <SettingsProvider>
      <div className="ios-app-container">
        <PullToRefresh>
          <main ref={mainContainerRef} className="ios-main-container pb-20 overflow-y-auto">
            <div className={`ios-header ${isScrolled ? "scrolled" : ""}`}>
              <h1 className="ios-header-title">News</h1>
            </div>

            {renderContent()}
          </main>
        </PullToRefresh>
        <TabBar />
      </div>
    </SettingsProvider>
  )
}