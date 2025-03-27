"use client"

import { useContext, useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SettingsContext } from "@/context/settings-context"
import { useTheme } from "next-themes"

export function SettingsButton() {
  const { settings, updateSettings } = useContext(SettingsContext)
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Customize your news reading experience</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-base">
              Theme
            </Label>
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch
                id="theme"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size" className="text-base">
              Font Size
            </Label>
            <Slider
              id="font-size"
              min={1}
              max={3}
              step={1}
              defaultValue={[settings.fontSize]}
              onValueChange={(value) => updateSettings({ fontSize: value[0] })}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="view" className="text-base">
              Default View
            </Label>
            <RadioGroup
              id="view"
              value={settings.defaultView}
              onValueChange={(value) => updateSettings({ defaultView: value as "grid" | "list" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grid" id="grid" />
                <Label htmlFor="grid">Grid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="list" id="list" />
                <Label htmlFor="list">List</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Bookmarks</Label>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false)
                // Navigate to bookmarks page
              }}
            >
              View Bookmarks
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

