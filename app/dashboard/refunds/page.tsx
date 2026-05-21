import { CheckCircle2, RotateCcw, XCircle } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { refunds } from "@/lib/mock/dashboard-data"
import type { Refund } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"

const columns: DataTableColumn<Refund>[] = [
  { header: "Refund", cell: (row) => <div><p className="font-medium">{row.id}</p><p className="text-xs text-muted-foreground">{row.type} refund</p></div> },
  { header: "Linked transaction", cell: (row) => row.transactionId },
  { header: "Customer", cell: (row) => maskPhone(row.customerPhone) },
  { header: "Amount", cell: (row) => formatMoney(row.amount), className: "text-right" },
  { header: "Approval status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Reason", cell: (row) => row.reason },
  { header: "Requested by", cell: (row) => row.requestedBy },
  { header: "Date", cell: (row) => row.date },
  {
    header: "Action",
    className: "text-right",
    cell: (row) => row.status === "Requested" ? (
      <div className="flex justify-end gap-2">
        <ActionButton
          size="sm"
          variant="outline"
          action={{ type: "message", message: `${row.id} approved in the mock UI. Real refund release requires backend permissions and provider integration.` }}
        >
          <CheckCircle2 className="size-4" /> Approve
        </ActionButton>
        <ActionButton
          size="sm"
          variant="destructive"
          action={{ type: "message", message: `${row.id} rejected in the mock UI. Production should capture reviewer reason and audit log.` }}
        >
          <XCircle className="size-4" /> Reject
        </ActionButton>
      </div>
    ) : "Reviewed",
  },
]

export default function RefundsPage() {
  return (
    <>
      <PageHeader
        title="Refunds"
        description="Manage full and partial refunds with approval states, linked transactions, reasons, and visible audit expectations."
        actions={<NewRefundDialog />}
      />
      <Card>
        <CardHeader>
          <CardTitle>Refund control</CardTitle>
          <CardDescription>Cashiers should not issue refunds without Finance Manager or Owner approval.</CardDescription>
        </CardHeader>
        <CardContent className="rounded-b-lg border-t bg-muted/30 p-5 text-sm leading-6 text-muted-foreground">
          Production refund approval must capture requester, reviewer, reason, old value, new value, IP address, timestamp, and immutable audit log entry.
        </CardContent>
      </Card>
      <FilterBar searchPlaceholder="Search refund, transaction, customer" provider={false} statusOptions={["All statuses", "Requested", "Approved", "Processing", "Successful", "Failed", "Rejected"]} />
      <DataTable data={refunds} columns={columns} getRowKey={(row) => row.id} />
    </>
  )
}

function NewRefundDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <RotateCcw className="size-4" /> New refund request
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New refund request</DialogTitle>
          <DialogDescription>Submit a full or partial refund request for finance approval.</DialogDescription>
        </DialogHeader>
        <MockForm
          className="grid gap-4 py-4"
          submitLabel="Submit refund request"
          message="Refund request submitted in mock mode. Backend permission checks and provider refund APIs still need integration."
        >
          <div className="grid gap-2">
            <Label>Transaction ID</Label>
            <Input placeholder="txn_MW_240521_0001" />
          </div>
          <div className="grid gap-2">
            <Label>Refund type</Label>
            <Select defaultValue="partial">
              <option value="full">Full refund</option>
              <option value="partial">Partial refund</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input placeholder="MWK 45,000" />
          </div>
          <div className="grid gap-2">
            <Label>Reason</Label>
            <Textarea placeholder="Customer returned item" />
          </div>
        </MockForm>
      </DialogContent>
    </Dialog>
  )
}
