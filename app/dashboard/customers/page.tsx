import type { ReactNode } from "react"
import { ShieldAlert, Users } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { customers } from "@/lib/mock/dashboard-data"
import type { Customer } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"

const columns: DataTableColumn<Customer>[] = [
  { header: "Customer phone", cell: (row) => <span className="font-medium">{maskPhone(row.phone)}</span> },
  { header: "Total paid", cell: (row) => formatMoney(row.totalPaid), className: "text-right" },
  { header: "Last payment", cell: (row) => row.lastPayment },
  { header: "Successful", cell: (row) => row.successfulPayments.toString(), className: "text-right" },
  { header: "Failed", cell: (row) => row.failedPayments.toString(), className: "text-right" },
  { header: "Refunds", cell: (row) => row.refunds.toString(), className: "text-right" },
  { header: "Disputes", cell: (row) => row.disputeCount.toString(), className: "text-right" },
  { header: "Risk flag", cell: (row) => <StatusBadge status={row.riskFlag} /> },
]

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Customers"
        description="Review customer payment behavior using masked phone numbers by default. Full phone access should require explicit permission."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Metric icon={<Users className="size-5" />} label="Known customers" value={customers.length.toString()} />
        <Metric label="Total customer value" value={formatMoney(customers.reduce((sum, customer) => sum + customer.totalPaid, 0))} />
        <Metric icon={<ShieldAlert className="size-5" />} label="Risk flagged" value={customers.filter((customer) => customer.riskFlag !== "None").length.toString()} />
      </div>
      <FilterBar searchPlaceholder="Search masked phone or customer ID" provider={false} statusOptions={["All risk flags", "None", "Watchlist", "High failure rate", "Refund review"]} />
      <DataTable data={customers} columns={columns} getRowKey={(row) => row.id} />
    </>
  )
}

function Metric({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        {icon ? <div className="flex size-10 items-center justify-center rounded-md border bg-muted text-muted-foreground">{icon}</div> : null}
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
