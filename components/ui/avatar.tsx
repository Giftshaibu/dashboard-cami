import * as React from "react"

import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground", className)} {...props} />
}

export { Avatar }
