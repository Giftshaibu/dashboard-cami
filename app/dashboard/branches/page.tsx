import { QrCode, Store } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { branches } from "@/lib/mock/dashboard-data"
import type { Branch } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"

const columns: DataTableColumn<Branch>[] = [
  { header: "Branch", cell: (row) => <div><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.city}</p></div> },
  { header: "Manager", cell: (row) => row.manager },
  { header: "Cashiers", cell: (row) => row.cashiers.toString(), className: "text-right" },
  { header: "Gross collections", cell: (row) => formatMoney(row.grossCollections), className: "text-right" },
  { header: "Successful", cell: (row) => row.successfulPayments.toString(), className: "text-right" },
  { header: "Failed", cell: (row) => row.failedPayments.toString(), className: "text-right" },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
]

export default function BranchesPage() {
  return (
    <>
      <PageHeader
        title="Branches & Cashiers"
        description="Manage outlets, branch performance, cashier assignment, QR placeholders, and branch-specific permission ideas."
        actions={<AddBranchDialog />}
      />
      <DataTable data={branches} columns={columns} getRowKey={(row) => row.id} />
      <div className="grid gap-4 xl:grid-cols-3">
        {branches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <CardTitle>{branch.name}</CardTitle>
              <CardDescription>{branch.city} · {branch.manager}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex aspect-square items-center justify-center rounded-lg border border-dashed bg-muted/30">
                <div className="text-center">
                  <QrCode className="mx-auto size-12 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">Outlet QR placeholder</p>
                  <p className="text-xs text-muted-foreground">{branch.id}</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">Branch permissions can restrict cashiers to creating requests and viewing only their outlet transactions.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

function AddBranchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Store className="size-4" /> Add branch
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add branch</DialogTitle>
          <DialogDescription>Create an outlet and assign a manager in mock mode.</DialogDescription>
        </DialogHeader>
        <MockForm
          className="grid gap-4 py-4"
          submitLabel="Create branch"
          message="Branch created in mock mode. Backend outlet storage, QR creation, and branch permissions still need integration."
        >
          <div className="grid gap-2">
            <Label>Branch name</Label>
            <Input placeholder="Zomba Outlet" />
          </div>
          <div className="grid gap-2">
            <Label>City</Label>
            <Input placeholder="Zomba" />
          </div>
          <div className="grid gap-2">
            <Label>Manager email</Label>
            <Input type="email" placeholder="manager@mwaiphones.mw" />
          </div>
        </MockForm>
      </DialogContent>
    </Dialog>
  )
}
