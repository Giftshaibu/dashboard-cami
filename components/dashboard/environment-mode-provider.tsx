"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

type EnvironmentMode = "sandbox" | "live"

const EnvironmentModeContext = createContext<{
  mode: EnvironmentMode
  liveMode: boolean
  setLiveMode: (liveMode: boolean) => void
}>({
  mode: "sandbox",
  liveMode: false,
  setLiveMode: () => undefined,
})

export function EnvironmentModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<EnvironmentMode>(() => {
    if (typeof window === "undefined") {
      return "sandbox"
    }

    return window.localStorage.getItem("mwai-environment-mode") === "live" ? "live" : "sandbox"
  })

  useEffect(() => {
    window.localStorage.setItem("mwai-environment-mode", mode)
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      liveMode: mode === "live",
      setLiveMode: (liveMode: boolean) => setMode(liveMode ? "live" : "sandbox"),
    }),
    [mode]
  )

  return <EnvironmentModeContext.Provider value={value}>{children}</EnvironmentModeContext.Provider>
}

export function useEnvironmentMode() {
  return useContext(EnvironmentModeContext)
}
