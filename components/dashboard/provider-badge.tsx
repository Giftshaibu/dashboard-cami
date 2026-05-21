import { Badge } from "@/components/ui/badge"
import type { Provider } from "@/lib/types/dashboard"

export function ProviderBadge({ provider }: { provider: Provider }) {
  const isAirtel = provider === "Airtel Money"

  return (
    <Badge
      variant="outline"
      className={isAirtel ? "border-red-200 bg-red-50 text-red-700" : "border-sky-200 bg-sky-50 text-sky-700"}
    >
      <span className={isAirtel ? "size-1.5 rounded-full bg-red-500" : "size-1.5 rounded-full bg-sky-500"} />
      {provider}
    </Badge>
  )
}
