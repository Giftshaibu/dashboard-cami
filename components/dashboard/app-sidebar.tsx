"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  CreditCard,
  FileText,
  GitCompare,
  Home,
  Landmark,
  LifeBuoy,
  Link2,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Scale,
  Send,
  Settings,
  ShieldCheck,
  Store,
  UserCog,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { merchant } from "@/lib/mock/dashboard-data"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Payments",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home },
      { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
      { href: "/dashboard/accept-payment", label: "Accept Payment", icon: Send },
      { href: "/dashboard/payment-links", label: "Payment Links", icon: Link2 },
      { href: "/dashboard/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/dashboard/refunds", label: "Refunds", icon: RotateCcw },
      { href: "/dashboard/disputes", label: "Disputes", icon: Scale },
      { href: "/dashboard/settlements", label: "Settlements", icon: Landmark },
      { href: "/dashboard/reconciliation", label: "Reconciliation", icon: GitCompare },
      { href: "/dashboard/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Platform",
    items: [
      { href: "/dashboard/developers", label: "Developers", icon: Code2 },
      { href: "/dashboard/branches", label: "Branches", icon: Store },
      { href: "/dashboard/team", label: "Team & Roles", icon: UserCog },
      { href: "/dashboard/compliance", label: "Compliance", icon: ShieldCheck },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
]

type AppSidebarProps = {
  className?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function AppSidebar({ className, collapsed = false, onCollapsedChange }: AppSidebarProps) {
  const pathname = usePathname()
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar/95 text-sidebar-foreground backdrop-blur transition-[width] duration-200 ease-[var(--ease-out-ui)]",
        collapsed ? "w-20" : "w-72",
        className
      )}
    >
      <div className={cn("border-b py-5", collapsed ? "px-3" : "px-5")}>
        <div className={cn("flex items-center", collapsed ? "flex-col gap-3" : "justify-between gap-3")}>
          <Link href="/dashboard" className={cn("flex min-w-0 items-center gap-3", collapsed && "justify-center")}>
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20">
              MW
            </div>
            <div className={cn("min-w-0", collapsed && "sr-only")}>
              <p className="truncate text-sm font-semibold">{merchant.tradingName}</p>
              <p className="truncate text-xs text-muted-foreground">{merchant.email}</p>
            </div>
          </Link>
          {onCollapsedChange && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="hidden lg:inline-flex"
              onClick={() => onCollapsedChange(!collapsed)}
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ToggleIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <nav className={cn("flex-1 overflow-y-auto py-5", collapsed ? "space-y-4 px-2" : "space-y-6 px-3")}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className={cn("px-2 text-xs font-semibold uppercase text-muted-foreground", collapsed && "sr-only")}>
              {group.label}
            </p>
            <div className={cn("space-y-1", !collapsed && "mt-2")}>
              {group.items.map((item) => {
                const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={collapsed ? item.label : undefined}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,transform] duration-150 ease-[var(--ease-out-ui)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:scale-[0.985]",
                      collapsed && "justify-center px-2",
                      active && "bg-sidebar-accent text-sidebar-accent-foreground shadow-xs"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-opacity duration-150 ease-[var(--ease-out-ui)]",
                        active && "opacity-100"
                      )}
                    />
                    <Icon className="size-4" />
                    <span className={cn(collapsed && "sr-only")}>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className={cn("border-t", collapsed ? "p-3" : "p-4")}>
        <div className={cn("rounded-lg border border-sidebar-border bg-background/70 p-3", collapsed && "flex justify-center p-2")}>
          <div
            className={cn("flex items-center gap-2 text-sm font-medium", collapsed && "justify-center")}
            title="Support"
          >
            <LifeBuoy className="size-4 text-muted-foreground" />
            <span className={cn(collapsed && "sr-only")}>Support</span>
          </div>
          <p className={cn("mt-2 text-xs leading-5 text-muted-foreground", collapsed && "sr-only")}>
            Webhook failures and settlement holds should be escalated promptly.
          </p>
        </div>
      </div>
    </aside>
  )
}
