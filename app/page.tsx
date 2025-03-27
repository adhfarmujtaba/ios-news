"use client"

import { useState, useEffect, useRef } from "react"
import SearchBar from "@/components/search-bar"
import CategoryFilter from "@/components/category-filter"
import TabBar from "@/components/tab-bar"
import PullToRefresh from "@/components/pull-to-refresh"
import NewsGrid from "@/components/news-grid"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const mainContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        setIsScrolled(mainContainerRef.current.scrollTop > 10) // Adjust threshold as needed
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

  return (
    <div className="ios-app-container">
      <PullToRefresh>
        <main ref={mainContainerRef} className="ios-main-container pb-20 overflow-y-auto">
          <div className={`ios-header ${isScrolled ? "scrolled" : ""}`}>
            <h1 className="ios-header-title">News</h1>
          </div>

          <div className="px-4">
            <SearchBar className="mb-4" redirectToHome={true} />
            <CategoryFilter className="mb-6" />
            <NewsGrid />
          </div>
        </main>
      </PullToRefresh>
      <TabBar />
    </div>
  )
}

