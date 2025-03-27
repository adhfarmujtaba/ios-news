"use client"

import type React from "react"
import { useContext, useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { NewsContext } from "@/context/news-context"

interface SearchBarProps {
  className?: string
  redirectToHome?: boolean
}

export default function SearchBar({ className = "", redirectToHome = false }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useContext(NewsContext)
  const [query, setQuery] = useState("")

  // Initialize query from context
  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSearchQuery(value)
  }

  const clearSearch = () => {
    setQuery("")
    setSearchQuery("")
  }

  // Clear search when component unmounts
  useEffect(() => {
    return () => {
      if (!redirectToHome) {
        // Only clear if we're not redirecting
        // This prevents the search from being cleared when navigating between pages
      }
    }
  }, [redirectToHome])

  return (
    <div className={`ios-search-container ${className}`}>
      <div className="ios-search-icon-container">
        <Search className="ios-search-icon" />
      </div>
      <input
        type="text"
        placeholder="Search news..."
        className="ios-search-input"
        value={query}
        onChange={handleSearch}
      />
      {query && (
        <button className="ios-search-clear-button" onClick={clearSearch}>
          <X className="ios-search-clear-icon" />
        </button>
      )}
    </div>
  )
}

