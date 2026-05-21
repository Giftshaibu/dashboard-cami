import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-10 text-center">
        <div className="flex size-11 items-center justify-center rounded-md border bg-muted text-muted-foreground">
          <Icon className="size-5" />
        </div>
        <h3 className="mt-4 text-sm font-semibold">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
