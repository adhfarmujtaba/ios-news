"use client"

import { useContext, useEffect } from "react"
import { History, Trash2 } from "lucide-react"
import TabBar from "@/components/tab-bar"
import { ReadingHistoryContext } from "@/context/reading-history-context"
import NewsCard from "@/components/news-card"
import { SettingsContext } from "@/context/settings-context"

export default function HistoryPage() {
  const { historyItems, clearHistory } = useContext(ReadingHistoryContext)
  const { settings } = useContext(SettingsContext)

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
        <div className="ios-header flex justify-between items-center">
          <h1 className="ios-header-title">Reading History</h1>
          {historyItems.length > 0 && (
            <button
              className="text-[hsl(var(--ios-blue))] flex items-center gap-1"
              onClick={() => {
                if (confirm("Are you sure you want to clear your reading history?")) {
                  clearHistory()
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="px-4">
          {historyItems.length === 0 ? (
            <div className="ios-empty-state">
              <History className="ios-empty-icon" />
              <h3 className="ios-empty-title">No reading history</h3>
              <p className="ios-empty-description">Articles you read will appear here.</p>
            </div>
          ) : (
            <div className={settings.defaultView === "grid" ? "ios-grid-layout" : "ios-list-layout"}>
              {historyItems.map((news) => (
                <NewsCard key={news.slug} news={news} view={settings.defaultView} />
              ))}
            </div>
          )}
        </div>
      </main>
      <TabBar />
    </div>
  )
}

