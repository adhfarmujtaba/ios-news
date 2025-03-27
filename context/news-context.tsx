"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { NewsItem } from "@/types"
import { getAllNews, getCategories } from "@/lib/news"

interface NewsContextType {
  news: NewsItem[]
  filteredNews: NewsItem[]
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  refreshNews: () => void
}

const defaultContext: NewsContextType = {
  news: [],
  filteredNews: [],
  categories: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  refreshNews: () => {},
}

export const NewsContext = createContext<NewsContextType>(defaultContext)

interface NewsProviderProps {
  children: React.ReactNode
}

export function NewsProvider({ children }: NewsProviderProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchNews = () => {
      const allNews = getAllNews()
      setNews(allNews)
      setFilteredNews(allNews)

      const allCategories = getCategories()
      setCategories(allCategories)
    }

    fetchNews()
  }, [])

  useEffect(() => {
    let filtered = [...news]

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
      )
    }

    setFilteredNews(filtered)
  }, [news, selectedCategory, searchQuery])

  const refreshNews = () => {
    // In a real app, this would fetch fresh data from the API
    const allNews = getAllNews()
    setNews(allNews)
  }

  const value = {
    news,
    filteredNews,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    refreshNews,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

