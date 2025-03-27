"use client"

import { useContext } from "react"
import { Grid, List } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsContext } from "@/context/settings-context"

export function ViewToggle() {
  const { settings, updateSettings } = useContext(SettingsContext)

  const handleViewChange = (value: string) => {
    updateSettings({ defaultView: value as "grid" | "list" })
  }

  return (
    <Tabs value={settings.defaultView} onValueChange={handleViewChange} className="w-fit">
      <TabsList className="grid w-[120px] grid-cols-2">
        <TabsTrigger value="grid">
          <Grid className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="list">
          <List className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

