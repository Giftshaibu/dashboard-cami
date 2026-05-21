import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: string
  detail?: string
  icon: LucideIcon
  tone?: "default" | "success" | "warning" | "danger"
}

export function StatCard({ title, value, detail, icon: Icon, tone = "default" }: StatCardProps) {
  return (
    <Card className="overflow-hidden transition-[border-color,box-shadow,transform] duration-150 ease-[var(--ease-out-ui)] hover:border-ring/25 hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 truncate text-2xl font-semibold tracking-tight text-foreground">{value}</p>
            {detail ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p> : null}
          </div>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-md border",
              tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
              tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300",
              tone === "danger" && "border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
              tone === "default" && "border-border bg-muted text-muted-foreground"
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
