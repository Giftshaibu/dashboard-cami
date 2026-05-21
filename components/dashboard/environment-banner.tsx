import { Info, ShieldCheck } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useEnvironmentMode } from "@/components/dashboard/environment-mode-provider"

export function EnvironmentBanner() {
  const { liveMode } = useEnvironmentMode()

  if (liveMode) {
    return null
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-12 items-center gap-4 bg-[#0b3a66] px-4 text-white dark:border-b dark:border-border dark:bg-black lg:px-6">
      <div className="flex min-w-fit items-center gap-2 text-sm font-semibold">
        Sandbox
        <Info className="size-4 opacity-90" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2 text-center text-sm font-medium">
        <ShieldCheck className="hidden size-4 opacity-90 sm:block" />
        <span>You&apos;re testing in sandbox mode. Live collections stay disabled until your business is verified.</span>
      </div>
      <Button asChild className="hidden bg-white text-[#0b3a66] hover:bg-white/90 dark:text-black md:inline-flex" size="sm">
        <Link href="/dashboard/compliance">Verify your business</Link>
      </Button>
    </div>
  )
}
