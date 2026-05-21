import type { ReactNode } from "react"
import { Activity, Code2, KeyRound, RotateCcw, ShieldCheck, Webhook } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { apiKeys, webhookEvents } from "@/lib/mock/dashboard-data"
import type { ApiKey, WebhookEvent } from "@/lib/types/dashboard"

const keyColumns: DataTableColumn<ApiKey>[] = [
  { header: "Key", cell: (row) => <div><p className="font-medium">{row.name}</p><p className="font-mono text-xs text-muted-foreground">{row.maskedValue}</p></div> },
  { header: "Environment", cell: (row) => <StatusBadge status={row.environment} /> },
  { header: "Scopes", cell: (row) => row.scopes.join(", ") },
  { header: "Last used", cell: (row) => row.lastUsed },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  {
    header: "Actions",
    className: "text-right",
    cell: (row) => (
      <div className="flex justify-end gap-2">
        <ActionButton
          size="sm"
          variant="outline"
          action={{ type: "message", message: `Rotation requested for ${row.name}. Production should create a new key, mask it after creation, and audit log the event.` }}
        >
          <RotateCcw className="size-4" /> Rotate key
        </ActionButton>
        <ActionButton
          size="sm"
          variant="destructive"
          action={{ type: "message", message: `${row.name} disabled in the mock UI. Backend key revocation still needs integration.` }}
        >
          Disable key
        </ActionButton>
      </div>
    ),
  },
]

const webhookColumns: DataTableColumn<WebhookEvent>[] = [
  { header: "Event ID", cell: (row) => row.id },
  { header: "Event", cell: (row) => row.event },
  { header: "URL", cell: (row) => <span className="break-all">{row.url}</span> },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "HTTP", cell: (row) => row.httpCode.toString() },
  { header: "Attempts", cell: (row) => row.attempts.toString(), className: "text-right" },
  { header: "Last attempt", cell: (row) => row.lastAttempt },
  {
    header: "Action",
    cell: (row) => (
      <ActionButton
        size="sm"
        variant="outline"
        action={{ type: "message", message: `Manual retry queued for ${row.id}. Real webhook delivery requires backend jobs and signing.` }}
      >
        Retry manually
      </ActionButton>
    ),
    className: "text-right",
  },
]

export default function DevelopersPage() {
  return (
    <>
      <PageHeader
        title="Developers"
        description="Manage masked API keys, webhook configuration, callback domains, API logs, webhook logs, and a test payment simulator."
        actions={
          <div className="flex gap-2">
            <CreateAppDialog />
            <ActionButton action={{ type: "message", message: "Mock API key generated. Secret values should only be shown once after backend key creation." }}>
              <KeyRound className="size-4" /> Generate key
            </ActionButton>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>API keys</CardTitle>
            <CardDescription>Secret keys are masked and should never be shown again after creation.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={apiKeys} columns={keyColumns} getRowKey={(row) => row.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
            <CardDescription>Use test mode for simulator workflows before going live.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Test mode</p>
                <p className="text-sm text-muted-foreground">No real provider calls.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              API key changes, webhook URL changes, and domain changes must be audit logged.
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Webhook endpoint</CardTitle>
            <CardDescription>Every webhook event should be signed. Merchants must verify webhook signatures before trusting confirmations.</CardDescription>
          </CardHeader>
          <CardContent>
            <MockForm
              className="grid gap-4"
              submitLabel={<><Webhook className="size-4" /> Save webhook</>}
              message="Webhook settings saved in the mock UI. Production should validate domains, rotate secrets safely, and audit log changes."
            >
            <div className="grid gap-2">
              <Label>Webhook URL</Label>
              <Input value="https://mwaiphones.mw/api/payments/webhook" readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Webhook secret</Label>
              <Input value="whsec_••••••••••••••••" readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Allowed callback domains</Label>
              <Textarea value={"mwaiphones.mw\ncheckout.mwaiphones.mw"} readOnly />
            </div>
            </MockForm>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test payment simulator</CardTitle>
            <CardDescription>Simulate gateway states without creating real Airtel Money or Mpamba transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <MockForm
              className="grid gap-4"
              submitLabel={<><Activity className="size-4" /> Run simulator</>}
              message="Test payment simulation completed. No real Airtel Money or TNM Mpamba request was sent."
            >
            <div className="grid gap-2">
              <Label>Provider</Label>
              <Select defaultValue="airtel">
                <option value="airtel">Airtel Money</option>
                <option value="tnm">TNM Mpamba</option>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Outcome</Label>
              <Select defaultValue="successful">
                <option value="successful">Successful</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="expired">Expired</option>
              </Select>
            </div>
            </MockForm>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Webhook logs</CardTitle>
          <CardDescription>Delivery history for signed merchant events.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={webhookEvents} columns={webhookColumns} getRowKey={(row) => row.id} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API logs</CardTitle>
          <CardDescription>Recent mock requests for developer troubleshooting.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Log icon={<Code2 className="size-4" />} title="POST /payments" detail="201 Created · 142 ms" />
          <Log icon={<ShieldCheck className="size-4" />} title="GET /transactions" detail="200 OK · 88 ms" />
          <Log icon={<Webhook className="size-4" />} title="POST /webhooks/retry" detail="403 Permission required" />
        </CardContent>
      </Card>
    </>
  )
}

function CreateAppDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Code2 className="size-4" /> Create app
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create application</DialogTitle>
          <DialogDescription>Register a merchant app for checkout, POS, or server-to-server integration.</DialogDescription>
        </DialogHeader>
        <MockForm
          className="grid gap-4 py-4"
          submitLabel="Create app"
          message="Application created in mock mode. Backend app registration, app IDs, and OAuth/login handoff still need integration."
        >
          <div className="grid gap-2">
            <Label>App name</Label>
            <Input placeholder="Mwai Phones Website" />
          </div>
          <div className="grid gap-2">
            <Label>App type</Label>
            <Select defaultValue="web">
              <option value="web">Website checkout</option>
              <option value="pos">Point of sale</option>
              <option value="mobile">Mobile app</option>
              <option value="server">Server integration</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Redirect URL</Label>
            <Input placeholder="https://mwaiphones.mw/payments/return" />
          </div>
          <div className="grid gap-2">
            <Label>Allowed domains</Label>
            <Textarea placeholder="mwaiphones.mw&#10;checkout.mwaiphones.mw" />
          </div>
        </MockForm>
      </DialogContent>
    </Dialog>
  )
}

function Log({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">{icon}{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  )
}
