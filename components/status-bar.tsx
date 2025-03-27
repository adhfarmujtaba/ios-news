"use client"

import { useEffect, useState } from "react"
import { Battery, Signal, Wifi } from "lucide-react"

export function StatusBar() {
  const [time, setTime] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(100)

  useEffect(() => {
    setIsClient(true)

    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const period = hours >= 12 ? "PM" : "AM"
      setTime(`${formattedHours}:${formattedMinutes} ${period}`)
    }

    // Simulate random battery level between 60-100%
    setBatteryLevel(Math.floor(Math.random() * 41) + 60)

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="ios-status-bar">
      <div className="ios-status-bar-content">
        <div className="ios-status-time">{time}</div>
        <div className="ios-status-notch"></div>
        <div className="ios-status-icons">
          <Signal className="ios-status-icon" strokeWidth={2.5} />
          <Wifi className="ios-status-icon" strokeWidth={2.5} />
          <div className="flex items-center">
            <Battery className="ios-status-icon" strokeWidth={2.5} />
            <span className="text-xs ml-0.5">{batteryLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

