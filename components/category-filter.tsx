"use client"

import { useContext } from "react"
import { NewsContext } from "@/context/news-context"

interface CategoryFilterProps {
  className?: string
}

export default function CategoryFilter({ className = "" }: CategoryFilterProps) {
  const { categories, selectedCategory, setSelectedCategory } = useContext(NewsContext)

  const handleCategorySelect = (category: string) => {
    if (category === selectedCategory) {
      setSelectedCategory("")
    } else {
      setSelectedCategory(category)
    }
  }

  return (
    <div className={`ios-category-scroll-container ${className}`}>
      <div className="ios-category-scroll">
        <button
          className={`ios-category-button ${!selectedCategory ? "ios-category-active" : ""}`}
          onClick={() => setSelectedCategory("")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`ios-category-button ${selectedCategory === category ? "ios-category-active" : ""}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

