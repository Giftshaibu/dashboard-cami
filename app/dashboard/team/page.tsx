import { MailPlus, UserCog } from "lucide-react"

import { MockForm } from "@/components/dashboard/mock-form"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { teamMembers } from "@/lib/mock/dashboard-data"
import type { TeamMember } from "@/lib/types/dashboard"

const columns: DataTableColumn<TeamMember>[] = [
  { header: "Member", cell: (row) => <div><p className="font-medium">{row.name}</p><p className="text-xs text-muted-foreground">{row.email}</p></div> },
  { header: "Role", cell: (row) => <Badge variant="outline">{row.role}</Badge> },
  { header: "Branch", cell: (row) => row.branch ?? "All branches" },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Last active", cell: (row) => row.lastActive },
  { header: "Permissions summary", cell: (row) => row.permissions.join(", ") },
]

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Team & Roles"
        description="Invite teammates and review role badges for Owner, Admin, Finance Manager, Developer, Support Agent, Cashier, and Viewer."
        actions={<InviteUserDialog />}
      />
      <DataTable data={teamMembers} columns={columns} getRowKey={(row) => row.id} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Owner: full access", "Finance Manager: settlements, reports, refunds", "Developer: API keys, webhooks, logs", "Cashier: create payment requests only"].map((permission) => (
          <div key={permission} className="rounded-lg border bg-card p-4 text-sm leading-6 text-muted-foreground">
            <UserCog className="mb-3 size-5 text-muted-foreground" />
            {permission}
          </div>
        ))}
      </div>
    </>
  )
}

function InviteUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><MailPlus className="size-4" /> Invite user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user</DialogTitle>
          <DialogDescription>User invitations and role changes must be audit logged.</DialogDescription>
        </DialogHeader>
        <MockForm
          className="grid gap-4 py-4"
          submitLabel="Send invite"
          message="Invite sent in mock mode. Backend email delivery and user creation still need integration."
        >
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input placeholder="name@merchant.mw" />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select defaultValue="viewer">
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="finance">Finance Manager</option>
              <option value="developer">Developer</option>
              <option value="support">Support Agent</option>
              <option value="cashier">Cashier</option>
              <option value="viewer">Viewer</option>
            </Select>
          </div>
        </MockForm>
      </DialogContent>
    </Dialog>
  )
}
