import { Clock3, MessageSquareWarning } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { disputes } from "@/lib/mock/dashboard-data"
import type { Dispute } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"

const columns: DataTableColumn<Dispute>[] = [
  { header: "Case", cell: (row) => <div><p className="font-medium">{row.id}</p><p className="text-xs text-muted-foreground">{row.transactionId}</p></div> },
  { header: "Customer", cell: (row) => maskPhone(row.customerPhone) },
  { header: "Provider", cell: (row) => <ProviderBadge provider={row.provider} /> },
  { header: "Amount", cell: (row) => formatMoney(row.amount), className: "text-right" },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Reason", cell: (row) => row.reason },
  { header: "Assigned support", cell: (row) => row.assignedTo },
  { header: "SLA deadline", cell: (row) => row.slaDeadline },
]

export default function DisputesPage() {
  const activeDispute = disputes[0]

  return (
    <>
      <PageHeader
        title="Disputes"
        description="Track cases connected to transactions, providers, refunds, settlements, evidence, internal notes, and SLA deadlines."
      />
      <DataTable data={disputes} columns={columns} getRowKey={(row) => row.id} />
      <Card>
        <CardHeader>
          <CardTitle>Case detail layout</CardTitle>
          <CardDescription>{activeDispute.id} · {activeDispute.reason}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <Detail label="Transaction ID" value={activeDispute.transactionId} />
            <Detail label="Customer phone" value={maskPhone(activeDispute.customerPhone)} />
            <Detail label="Provider" value={activeDispute.provider} />
            <Detail label="Amount" value={formatMoney(activeDispute.amount)} />
            <Detail label="Internal notes" value={activeDispute.notes} />
          </div>
          <div className="rounded-lg border bg-muted/40 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Clock3 className="size-4" />
              SLA and support ownership
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Assigned to {activeDispute.assignedTo}. Deadline is {activeDispute.slaDeadline}. Evidence uploads and provider replies are backend integration work.</p>
            <div className="mt-4 flex gap-2">
              <StatusBadge status={activeDispute.status} />
              <MessageSquareWarning className="size-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 text-sm md:grid-cols-[160px_1fr]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
