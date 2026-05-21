"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/dashboard/theme-provider"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const Icon = theme === "dark" ? Sun : Moon

  return (
    <Button size="icon-sm" variant="outline" onClick={toggleTheme} aria-label="Toggle light and dark mode">
      <Icon className="size-4" />
    </Button>
  )
}
