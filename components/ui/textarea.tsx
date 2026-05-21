import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-md border border-input bg-background/70 px-3 py-2 text-sm text-foreground shadow-xs transition-[background-color,border-color,box-shadow] duration-150 ease-[var(--ease-out-ui)] placeholder:text-muted-foreground focus-visible:border-ring/50 focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
