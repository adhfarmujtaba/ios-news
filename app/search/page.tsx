"use client"

import { useContext, useEffect } from "react"
import TabBar from "@/components/tab-bar"
import SearchBar from "@/components/search-bar"
import { Search } from "lucide-react"
import { NewsContext } from "@/context/news-context"
import NewsGrid from "@/components/news-grid"
import { StatusBar } from "@/components/status-bar"

export default function SearchPage() {
  const { searchQuery, filteredNews } = useContext(NewsContext)

 useEffect(() => {
    const mainContainer = document.querySelector(".ios-main-container");
    const handleScroll = () => {
      const header = document.querySelector(".ios-header");
      if (header && mainContainer) {
        if (Math.round(mainContainer.scrollTop) > 0) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="ios-app-container">
      <main className="ios-main-container pb-20">
        <div className="ios-header">
          <h1 className="ios-header-title">Discover</h1>
        </div>

        <div className="px-4">
          <SearchBar className="mb-6" />

          {searchQuery ? (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">Search Results</h2>
              {filteredNews.length > 0 ? (
                <NewsGrid />
              ) : (
                <div className="ios-empty-state">
                  <Search className="ios-empty-icon" />
                  <h3 className="ios-empty-title">No Results Found</h3>
                  <p className="ios-empty-description">Try searching for different keywords or browse categories.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="ios-empty-state">
              <Search className="ios-empty-icon" />
              <h3 className="ios-empty-title">Discover News</h3>
              <p className="ios-empty-description">Search for topics, categories, or keywords to find news.</p>
            </div>
          )}
        </div>
      </main>
      <TabBar />
    </div>
  )
}

