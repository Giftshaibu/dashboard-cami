"use client"

import { Clock, Download, RotateCcw, Send } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { StatusBadge } from "@/components/dashboard/status-badge"
import type { Transaction } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"

export function TransactionDetail({
  transaction,
  open,
  onOpenChange,
}: {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-xl sm:w-[560px]">
        {transaction ? (
          <div className="space-y-5 p-6">
            <div className="pr-8">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Transaction detail</p>
              <h2 className="mt-1 text-xl font-semibold">{transaction.id}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{transaction.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ProviderBadge provider={transaction.provider} />
              <StatusBadge status={transaction.status} />
              <StatusBadge status={transaction.settlementStatus} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Amount" value={formatMoney(transaction.amount)} />
              <Metric label="Net amount" value={formatMoney(transaction.netAmount)} />
              <Metric label="Fees" value={formatMoney(transaction.fees)} />
              <Metric label="Customer phone" value={maskPhone(transaction.customerPhone)} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <DetailRow label="Provider reference" value={transaction.providerReference} />
                <DetailRow label="Merchant reference" value={transaction.merchantReference} />
                <DetailRow label="Settlement batch" value={transaction.settlementBatch ?? "Not assigned"} />
                <DetailRow label="Webhook delivery" value={transaction.webhookStatus} />
                <DetailRow label="Callback URL" value={transaction.callbackUrl} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {transaction.timeline.map((event) => (
                  <div key={`${event.time}-${event.label}`} className="flex gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border bg-muted">
                      <Clock className="size-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.time} · {event.label}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{event.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            {transaction.failureReason ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                {transaction.failureReason}
              </div>
            ) : null}
            <Separator />
            <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
              Refunds, webhook resends, and manual adjustments are sensitive actions and should be written to immutable audit logs.
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButton
                size="sm"
                action={{
                  type: "download",
                  filename: `${transaction.id}-receipt.txt`,
                  content: `Receipt\nTransaction: ${transaction.id}\nProvider: ${transaction.provider}\nAmount: ${formatMoney(transaction.amount)}\nCustomer: ${maskPhone(transaction.customerPhone)}\nStatus: ${transaction.status}`,
                }}
              >
                <Download className="size-4" /> Receipt
              </ActionButton>
              <ActionButton
                size="sm"
                variant="outline"
                action={{ type: "message", message: `Refund review opened for ${transaction.id}. Backend approval workflow still needs integration.` }}
              >
                <RotateCcw className="size-4" /> Request refund
              </ActionButton>
              <ActionButton
                size="sm"
                variant="outline"
                action={{ type: "message", message: `Webhook resend queued for ${transaction.id}. Real delivery requires backend webhook jobs.` }}
              >
                <Send className="size-4" /> Resend webhook
              </ActionButton>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[150px_1fr]">
      <span className="text-muted-foreground">{label}</span>
      <span className="break-words font-medium text-foreground">{value}</span>
    </div>
  )
}
