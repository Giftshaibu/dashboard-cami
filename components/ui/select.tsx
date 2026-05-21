import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          "h-10 w-full appearance-none rounded-md border border-input bg-background/70 px-3 py-2 pr-9 text-sm text-foreground shadow-xs transition-[background-color,border-color,box-shadow] duration-150 ease-[var(--ease-out-ui)] focus-visible:border-ring/50 focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { Select }
