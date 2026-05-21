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
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 truncate text-2xl font-semibold tracking-tight">{value}</p>
            {detail ? <p className="mt-2 text-xs text-muted-foreground">{detail}</p> : null}
          </div>
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-md border",
              tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-700",
              tone === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
              tone === "danger" && "border-red-200 bg-red-50 text-red-700",
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
