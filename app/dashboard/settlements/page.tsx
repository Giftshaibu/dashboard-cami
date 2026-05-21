import { Download, Landmark } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { settlements } from "@/lib/mock/dashboard-data"
import type { Settlement } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { toCsv } from "@/lib/utils/to-csv"

const columns: DataTableColumn<Settlement>[] = [
  { header: "Settlement ID", cell: (row) => <span className="font-medium">{row.id}</span> },
  { header: "Period", cell: (row) => row.period },
  { header: "Gross amount", cell: (row) => formatMoney(row.grossAmount), className: "text-right" },
  { header: "Fees", cell: (row) => formatMoney(row.fees), className: "text-right" },
  { header: "Refunds/Reversals", cell: (row) => formatMoney(row.refundsAndReversals), className: "text-right" },
  { header: "Net settlement", cell: (row) => formatMoney(row.netSettlement), className: "text-right" },
  { header: "Destination", cell: (row) => row.destination },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  {
    header: "Report",
    cell: (row) => (
      <ActionButton
        size="sm"
        variant="outline"
        action={{
          type: "download",
          filename: `${row.id}-settlement.csv`,
          content: toCsv([{
            settlementId: row.id,
            period: row.period,
            grossAmount: row.grossAmount,
            fees: row.fees,
            refundsAndReversals: row.refundsAndReversals,
            netSettlement: row.netSettlement,
            status: row.status,
          }]),
        }}
      >
        <Download className="size-4" /> Report
      </ActionButton>
    ),
    className: "text-right",
  },
]

export default function SettlementsPage() {
  const gross = settlements.reduce((sum, settlement) => sum + settlement.grossAmount, 0)
  const fees = settlements.reduce((sum, settlement) => sum + settlement.fees, 0)
  const net = settlements.reduce((sum, settlement) => sum + settlement.netSettlement, 0)

  return (
    <>
      <PageHeader
        title="Settlements"
        description="Separate gross collections, provider and gateway fees, refunds, reversals, destination account, settlement status, and downloadable reports."
        actions={
          <ActionButton
            variant="outline"
            action={{
              type: "download",
              filename: "settlements.csv",
              content: toCsv(
                settlements.map((settlement) => ({
                  settlementId: settlement.id,
                  period: settlement.period,
                  grossAmount: settlement.grossAmount,
                  fees: settlement.fees,
                  refundsAndReversals: settlement.refundsAndReversals,
                  netSettlement: settlement.netSettlement,
                  destination: settlement.destination,
                  status: settlement.status,
                }))
              ),
            }}
          >
            <Download className="size-4" /> Download report
          </ActionButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Gross collections" value={formatMoney(gross)} detail="Before fees and reversals" icon={Landmark} />
        <StatCard title="Fees" value={formatMoney(fees)} detail="Provider and gateway deductions" icon={Landmark} tone="warning" />
        <StatCard title="Net settlement" value={formatMoney(net)} detail="Merchant payout after adjustments" icon={Landmark} tone="success" />
      </div>
      <DataTable data={settlements} columns={columns} getRowKey={(row) => row.id} />
      <Card>
        <CardHeader>
          <CardTitle>Settlement detail view</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-4">
          <Detail label="Batch" value="set_20260520_BT" />
          <Detail label="Status" value="On Hold" />
          <Detail label="Reason" value="TNM Mpamba reconciliation mismatch" />
          <Detail label="Next action" value="Finance review after provider confirmation" />
        </CardContent>
      </Card>
    </>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-xs font-medium uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  )
}
