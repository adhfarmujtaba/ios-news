"use client"

import type React from "react"
import { useContext, useEffect, useState, useRef } from "react"
import { NewsContext } from "@/context/news-context"

interface PullToRefreshProps {
  children: React.ReactNode
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
  const { refreshNews } = useContext(NewsContext)
  const [startY, setStartY] = useState(0)
  const [pulling, setPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const threshold = 80 // Minimum pull distance to trigger refresh

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const getScrollTop = () => {
      const container = document.querySelector(".ios-main-container") as HTMLElement | null
      return container ? Math.round(container.scrollTop) : 0
    }

    const isAtTop = () => getScrollTop() === 0

    const handleTouchStart = (e: TouchEvent) => {
      if (isAtTop()) {
        setStartY(e.touches[0].clientY)
        setPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling) return

      const y = e.touches[0].clientY
      const distance = y - startY

      if (distance > 0 && isAtTop()) {
        setPullDistance(Math.min(distance * 0.5, threshold * 1.5))
        if (distance > 0) e.preventDefault()
      } else {
        setPullDistance(0)
      }
    }

    const handleTouchEnd = () => {
      if (pulling && pullDistance >= threshold) {
        setRefreshing(true)
        setPullDistance(0)

        setTimeout(() => {
          refreshNews()
          setRefreshing(false)
        }, 1500)
      } else {
        setPullDistance(0)
      }
      setPulling(false)
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: false })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [pulling, pullDistance, refreshNews, startY, threshold, isClient])

  return (
    <div className="ios-pull-to-refresh-container" ref={containerRef}>
      {isClient && (pulling || refreshing) && (
        <div
          className="ios-pull-indicator"
          style={{
            height: pulling ? `${pullDistance}px` : refreshing ? "60px" : "0px",
            opacity: pulling ? Math.min(pullDistance / threshold, 1) : 1,
          }}
        >
          <div
            className={refreshing ? "ios-refresh-spinner" : "ios-pull-arrow"}
            style={{
              transform: pulling && pullDistance >= threshold ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {refreshing ? null : "↓"}
          </div>
          <span className="ios-pull-text">
            {refreshing ? "Refreshing..." : pullDistance >= threshold ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      )}
      {children}
    </div>
  )
}

