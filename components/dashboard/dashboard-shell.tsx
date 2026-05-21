"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { EnvironmentModeProvider, useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"
import { EnvironmentBanner } from "@/components/dashboard/environment-banner"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import { Topbar } from "@/components/dashboard/topbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <EnvironmentModeProvider>
        <DashboardShellInner>{children}</DashboardShellInner>
      </EnvironmentModeProvider>
    </ThemeProvider>
  )
}

function DashboardShellInner({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { liveMode } = useEnvironmentMode()

  return (
    <div className="min-h-dvh bg-muted/30">
      <EnvironmentBanner />
      <div
        className={cn(
          "fixed bottom-0 left-0 z-40 hidden transition-[top,width] duration-200 lg:block",
          liveMode ? "top-0" : "top-12",
          collapsed ? "w-20" : "w-72"
        )}
      >
        <AppSidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72">
          <AppSidebar />
        </SheetContent>
      </Sheet>
      <div
        className={cn(
          "transition-[padding] duration-200",
          liveMode ? "pt-0" : "pt-12",
          collapsed ? "lg:pl-20" : "lg:pl-72"
        )}
      >
        <Topbar onMenuClick={() => setOpen(true)} />
        <main className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
