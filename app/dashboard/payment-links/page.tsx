import { Copy, Link2, Plus } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { MockForm } from "@/components/dashboard/mock-form"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { paymentLinks } from "@/lib/mock/dashboard-data"
import type { PaymentLink } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"

const columns: DataTableColumn<PaymentLink>[] = [
  { header: "Name", cell: (row) => <div><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.id}</p></div> },
  { header: "Type", cell: (row) => row.type },
  { header: "Amount mode", cell: (row) => row.amountMode },
  { header: "Amount", cell: (row) => row.amount ? formatMoney(row.amount) : "Customer entered" },
  { header: "Payments", cell: (row) => row.payments.toString(), className: "text-right" },
  { header: "Expires", cell: (row) => row.expiresAt },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  {
    header: "Action",
    cell: (row) => (
      <ActionButton
        size="sm"
        variant="outline"
        action={{ type: "copy", text: `https://pay.mwaipay.mw/link/${row.id}`, message: "Payment link copied to clipboard." }}
      >
        <Copy className="size-4" /> Copy link
      </ActionButton>
    ),
    className: "text-right",
  },
]

export default function PaymentLinksPage() {
  return (
    <>
      <PageHeader
        title="Payment Links"
        description="Create reusable or single-use hosted payment links for WhatsApp sellers, schools, churches, events, and small business invoices."
        actions={<CreatePaymentLinkDialog />}
      />
      <DataTable data={paymentLinks} columns={columns} getRowKey={(row) => row.id} />
    </>
  )
}

function CreatePaymentLinkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus className="size-4" /> Create payment link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create payment link</DialogTitle>
          <DialogDescription>Configure a hosted link without connecting to real provider APIs yet.</DialogDescription>
        </DialogHeader>
        <MockForm
          className="grid gap-4 py-4"
          submitLabel={<><Link2 className="size-4" /> Create link</>}
          message="Mock payment link created. Backend storage and hosted checkout routing still need integration."
        >
          <div className="grid gap-2">
            <Label>Link name</Label>
            <Input placeholder="Samsung A15 deposit" />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea placeholder="Deposit for confirmed customer orders" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Link type</Label>
              <Select defaultValue="single">
                <option value="single">Single-use</option>
                <option value="reusable">Reusable</option>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Amount type</Label>
              <Select defaultValue="fixed">
                <option value="fixed">Fixed amount</option>
                <option value="customer">Customer-entered amount</option>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Amount</Label>
              <Input placeholder="MWK 85,000" />
            </div>
            <div className="grid gap-2">
              <Label>Expiry date</Label>
              <Input type="date" />
            </div>
          </div>
          <div className="rounded-lg border bg-muted/50 p-4 text-sm leading-6 text-muted-foreground">
            Customers will choose Airtel Money or TNM Mpamba at checkout and should never be asked to share a mobile money PIN.
          </div>
        </MockForm>
      </DialogContent>
    </Dialog>
  )
}
