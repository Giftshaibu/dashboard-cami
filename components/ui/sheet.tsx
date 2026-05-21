"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

function SheetContent({ className, children, side = "right", ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] transition-opacity duration-200 ease-[var(--ease-out-ui)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-0 z-50 h-dvh w-[320px] overflow-auto border bg-background p-0 shadow-xl shadow-black/12 transition-transform duration-200 ease-[var(--ease-out-ui)]",
          side === "left"
            ? "left-0 border-r data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0"
            : "right-0 border-l data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-[background-color,color,transform] duration-150 ease-[var(--ease-out-ui)] hover:bg-muted hover:text-foreground active:scale-[0.97]">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export { Sheet, SheetClose, SheetContent, SheetTrigger }
