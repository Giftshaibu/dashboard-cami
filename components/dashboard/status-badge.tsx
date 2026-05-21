import { Badge } from "@/components/ui/badge"
import type { PaymentStatus, SettlementStatus } from "@/lib/types/dashboard"

type StatusBadgeProps = {
  status: PaymentStatus | SettlementStatus | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase()
  const variant =
    normalized.includes("success") || normalized.includes("settled") || normalized === "paid" || normalized === "matched" || normalized === "verified" || normalized === "active" || normalized === "approved"
      ? "success"
      : normalized.includes("pending") || normalized.includes("processing") || normalized.includes("review") || normalized.includes("retrying")
        ? "warning"
        : normalized.includes("failed") || normalized.includes("rejected") || normalized.includes("mismatch") || normalized.includes("missing")
          ? "danger"
          : normalized.includes("hold") || normalized.includes("expired") || normalized.includes("disabled")
            ? "neutral"
            : "info"

  return <Badge variant={variant}>{status}</Badge>
}
