"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { Check } from "lucide-react"

import { useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MockFormProps = {
  children: ReactNode
  submitLabel: ReactNode
  message: string
  className?: string
}

export function MockForm({ children, submitLabel, message, className }: MockFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const { liveMode } = useEnvironmentMode()
  const liveModeTitle = "Disabled in Live mode until business verification and backend integration are complete."

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (liveMode) {
      window.alert(liveModeTitle)
      return
    }

    setSubmitted(true)
    window.alert(message)
    window.setTimeout(() => setSubmitted(false), 1800)
  }

  return (
    <form className={cn(liveMode && "opacity-50 grayscale", className)} onSubmit={handleSubmit}>
      <fieldset disabled={liveMode} className="contents">
        {children}
      </fieldset>
      <Button type="submit" className={cn(liveMode && "cursor-not-allowed")} aria-disabled={liveMode} title={liveMode ? liveModeTitle : undefined}>
        {submitted ? <Check className="size-4" /> : null}
        {submitLabel}
      </Button>
    </form>
  )
}
