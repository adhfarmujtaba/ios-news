"use client"

import { useContext, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ChevronRight, Moon, Sun, Monitor, History } from "lucide-react"
import { SettingsContext } from "@/context/settings-context"
import TabBar from "@/components/tab-bar"
import { FontSizeModal } from "@/components/font-size-modal"
import { ViewOptionsModal } from "@/components/view-options-modal"
import { useRouter } from "next/navigation"
import Tooltip from "@mui/material/Tooltip"

export default function SettingsPage() {
  const { settings, updateSettings } = useContext(SettingsContext)
  const { theme, setTheme } = useTheme()
  const [showFontSizeModal, setShowFontSizeModal] = useState(false)
  const [showViewOptionsModal, setShowViewOptionsModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const mainContainer = document.querySelector(".ios-main-container")
    const handleScroll = () => {
      const header = document.querySelector(".ios-header")
      if (header && mainContainer) {
        if (Math.round(mainContainer.scrollTop) > 0) {
          header.classList.add("scrolled")
        } else {
          header.classList.remove("scrolled")
        }
      }
    }

    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (mainContainer) {
        mainContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const fontSizes = [
    { value: 1, label: "Small" },
    { value: 2, label: "Medium" },
    { value: 3, label: "Large" },
  ]

  const viewOptions = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ]

  const themeOptions = [
    { value: "light", label: "Light", icon: <Sun className="ios-settings-icon" /> },
    { value: "dark", label: "Dark", icon: <Moon className="ios-settings-icon" /> },
    { value: "system", label: "System", icon: <Monitor className="ios-settings-icon" /> },
  ]

  // Prevent rendering theme-specific content until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="ios-app-container">
      <main className="ios-main-container pb-20">
        <div className="ios-header">
          <h1 className="ios-header-title">Settings</h1>
        </div>

        <div className="ios-settings-container">
          <div className="ios-settings-group">
            <div className="ios-settings-group-header">Appearance</div>

            <div className="ios-settings-item">
              <div className="ios-settings-item-label">
                <span>Theme</span>
              </div>
              <div className="ios-settings-item-value flex gap-4 items-center">
                {themeOptions.map((option) => (
                  <Tooltip key={option.value} title={option.label} arrow>
                    <div className="flex flex-col items-center">
                      <button
                        className={`p-2 rounded-full transition ${
                          theme === option.value ? "bg-gray-300 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        {option.icon}
                      </button>
                      {theme === option.value && (
                        <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                          {option.label}
                        </span>
                      )}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="ios-settings-item ios-settings-item-expandable" onClick={() => setShowFontSizeModal(true)}>
              <div className="ios-settings-item-label">
                <span>Font Size</span>
              </div>
              <div className="ios-settings-item-value">
                {fontSizes.find((f) => f.value === settings.fontSize)?.label}
                <ChevronRight className="ios-chevron-icon" />
              </div>
            </div>

            <div className="ios-settings-item ios-settings-item-expandable" onClick={() => setShowViewOptionsModal(true)}>
              <div className="ios-settings-item-label">
                <span>Default View</span>
              </div>
              <div className="ios-settings-item-value">
                {viewOptions.find((v) => v.value === settings.defaultView)?.label}
                <ChevronRight className="ios-chevron-icon" />
              </div>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          <div className="ios-settings-group">
            <div className="ios-settings-group-header">Content</div>

            <div className="ios-settings-item ios-settings-item-expandable" onClick={() => router.push("/bookmarks")}>
              <div className="ios-settings-item-label">
                <span>Bookmarks</span>
              </div>
              <ChevronRight className="ios-chevron-icon" />
            </div>

            <div className="ios-settings-item ios-settings-item-expandable" onClick={() => router.push("/history")}>
              <div className="ios-settings-item-label">
                <div className="ios-settings-icon-container">
                  <History className="ios-settings-icon" />
                </div>
                <span>Reading History</span>
              </div>
              <ChevronRight className="ios-chevron-icon" />
            </div>
          </div>

          <div className="ios-settings-group">
            <div className="ios-settings-group-header">About</div>

            <div className="ios-settings-item">
              <div className="ios-settings-item-label">
                <span>Version</span>
              </div>
              <div className="ios-settings-item-value">1.0.0</div>
            </div>

            <div className="ios-settings-item ios-settings-item-expandable">
              <div className="ios-settings-item-label">
                <span>Privacy Policy</span>
              </div>
              <ChevronRight className="ios-chevron-icon" />
            </div>
          </div>
        </div>
      </main>
      <TabBar />

      {showFontSizeModal && (
        <FontSizeModal
          currentSize={settings.fontSize}
          onSelect={(size) => {
            updateSettings({ fontSize: size })
            setShowFontSizeModal(false)
          }}
          onClose={() => setShowFontSizeModal(false)}
        />
      )}

      {showViewOptionsModal && (
        <ViewOptionsModal
          currentView={settings.defaultView}
          onSelect={(view) => {
            updateSettings({ defaultView: view as "grid" | "list" })
            setShowViewOptionsModal(false)
          }}
          onClose={() => setShowViewOptionsModal(false)}
        />
      )}
    </div>
  )
}