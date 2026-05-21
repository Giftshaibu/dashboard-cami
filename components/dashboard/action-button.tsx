"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { Check } from "lucide-react"

import { useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActionButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  children: ReactNode
  disableInLive?: boolean
  action:
    | { type: "message"; message: string }
    | { type: "copy"; text: string; message?: string }
    | { type: "download"; filename: string; content: string; mimeType?: string; message?: string }
}

export function ActionButton({ children, action, disableInLive, className, title, ...props }: ActionButtonProps) {
  const [done, setDone] = useState(false)
  const { liveMode } = useEnvironmentMode()
  const shouldDisableInLive = disableInLive ?? action.type === "message"
  const disabledByLiveMode = liveMode && shouldDisableInLive
  const liveModeTitle = "Disabled in Live mode until business verification and backend integration are complete."

  async function handleClick() {
    if (disabledByLiveMode) {
      window.alert(liveModeTitle)
      return
    }

    if (action.type === "copy") {
      await navigator.clipboard.writeText(action.text)
    }

    if (action.type === "download") {
      const blob = new Blob([action.content], { type: action.mimeType ?? "text/csv;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = action.filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    }

    setDone(true)
    window.setTimeout(() => setDone(false), 1800)

    if (action.type === "message" || action.message) {
      window.alert(action.type === "message" ? action.message : action.message)
    }
  }

  return (
    <Button
      type="button"
      {...props}
      className={cn(disabledByLiveMode && "cursor-not-allowed opacity-45 grayscale", className)}
      title={disabledByLiveMode ? liveModeTitle : title}
      aria-disabled={disabledByLiveMode || props["aria-disabled"]}
      onClick={handleClick}
    >
      {done ? <Check className="size-4" /> : null}
      {children}
    </Button>
  )
}
