"use client"

import { Bell, LogOut, Menu, Search } from "lucide-react"
import Link from "next/link"

import { ActionButton } from "@/components/dashboard/action-button"
import { ModeToggle } from "@/components/dashboard/mode-toggle"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { merchant } from "@/lib/mock/dashboard-data"
import { cn } from "@/lib/utils"
import { useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { liveMode } = useEnvironmentMode()

  return (
    <header
      className={cn(
        "sticky z-30 flex h-16 items-center gap-3 border-b border-border/80 bg-background/82 px-4 backdrop-blur-xl transition-[top] duration-200 ease-[var(--ease-out-ui)] supports-[backdrop-filter]:bg-background/72 lg:px-6",
        liveMode ? "top-0" : "top-12"
      )}
    >
      <Button className="lg:hidden" size="icon-sm" variant="outline" onClick={onMenuClick} aria-label="Open navigation">
        <Menu className="size-4" />
      </Button>
      <div className="relative hidden w-full max-w-md md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="border-border/80 bg-muted/35 pl-9 focus-visible:bg-background" placeholder="Search transactions, settlements, customers" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <ThemeToggle />
        <ActionButton
          size="icon-sm"
          variant="outline"
          aria-label="Notifications"
          action={{ type: "message", message: "No unread notifications. Webhook and settlement alerts will appear here." }}
        >
          <Bell className="size-4" />
        </ActionButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border border-border/80 bg-card/80 p-1.5 text-left shadow-xs transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out-ui)] hover:border-ring/35 hover:bg-muted active:scale-[0.97]">
              <Avatar>{merchant.tradingName.slice(0, 2).toUpperCase()}</Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Merchant profile</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Business profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Security settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogOut className="size-4" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
