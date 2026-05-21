import { FileUp, GitCompare, TriangleAlert } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { reconciliationItems } from "@/lib/mock/dashboard-data"
import type { ReconciliationItem } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"

const columns: DataTableColumn<ReconciliationItem>[] = [
  { header: "Provider", cell: (row) => <ProviderBadge provider={row.provider} /> },
  { header: "Provider reference", cell: (row) => row.providerReference },
  { header: "Gateway reference", cell: (row) => row.gatewayReference ?? "Missing" },
  { header: "Gateway amount", cell: (row) => formatMoney(row.amount), className: "text-right" },
  { header: "Provider amount", cell: (row) => row.providerAmount ? formatMoney(row.providerAmount) : "Missing", className: "text-right" },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Note", cell: (row) => row.note },
]

export default function ReconciliationPage() {
  return (
    <>
      <PageHeader
        title="Reconciliation"
        description="Compare provider statements against gateway transactions to catch missing items, amount mismatches, duplicate references, and settlement exposure."
        actions={
          <ActionButton action={{ type: "message", message: "Statement upload selected. Real CSV/Excel parsing and reconciliation jobs require backend integration." }}>
            <FileUp className="size-4" /> Upload provider statement
          </ActionButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Matched" value="1" detail="Auto-matched records" icon={GitCompare} tone="success" />
        <StatCard title="Missing in provider" value="1" detail="Gateway record absent from provider file" icon={TriangleAlert} tone="warning" />
        <StatCard title="Missing in gateway" value="1" detail="Provider record absent internally" icon={TriangleAlert} tone="danger" />
        <StatCard title="Amount mismatch" value="1" detail="Amount differs by source" icon={TriangleAlert} tone="danger" />
        <StatCard title="Duplicate references" value="0" detail="No duplicates in current batch" icon={GitCompare} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Statement upload placeholder</CardTitle>
          <CardDescription>CSV, Excel, and PDF parsing will be wired to backend reconciliation jobs later.</CardDescription>
        </CardHeader>
        <CardContent>
          <MockForm
            className="grid gap-4 rounded-lg border border-dashed bg-muted/30 p-6"
            submitLabel={<><FileUp className="size-4" /> Submit statement</>}
            message="Provider statement selected for mock reconciliation. Backend parsing and matching jobs still need integration."
          >
            <div className="flex items-center gap-3">
              <FileUp className="size-10 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Upload Airtel Money or TNM Mpamba statement</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">CSV or Excel files will be parsed by backend reconciliation jobs later.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Provider</Label>
                <Select defaultValue="airtel">
                  <option value="airtel">Airtel Money</option>
                  <option value="tnm">TNM Mpamba</option>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Statement file</Label>
                <Input type="file" accept=".csv,.xlsx,.xls" />
              </div>
            </div>
          </MockForm>
        </CardContent>
      </Card>
      <DataTable data={reconciliationItems} columns={columns} getRowKey={(row) => row.id} />
    </>
  )
}
