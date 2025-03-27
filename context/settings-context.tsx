"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

interface Settings {
  fontSize: number
  defaultView: "grid" | "list"
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  fontSize: 2, // 1 = small, 2 = medium, 3 = large
  defaultView: "grid",
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
})

interface SettingsProviderProps {
  children: React.ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load settings from localStorage on component mount
    try {
      const savedSettings = localStorage.getItem("newsAppSettings")
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
      } else {
        // If no settings found, save the default settings
        localStorage.setItem("newsAppSettings", JSON.stringify(defaultSettings))
      }
    } catch (error) {
      console.error("Failed to parse saved settings:", error)
      // If there's an error, save the default settings
      localStorage.setItem("newsAppSettings", JSON.stringify(defaultSettings))
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      try {
        // Apply font size to document
        document.documentElement.style.fontSize = `${100 + (settings.fontSize - 2) * 12.5}%`

        // Save to localStorage whenever settings change
        localStorage.setItem("newsAppSettings", JSON.stringify(settings))
      } catch (error) {
        console.error("Error applying settings:", error)
      }
    }
  }, [settings, isClient])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, ...newSettings }
      return updatedSettings
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

