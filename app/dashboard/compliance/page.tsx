import { AlertTriangle, Building2, FileCheck2, ShieldCheck } from "lucide-react"

import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { kycDocuments, merchant } from "@/lib/mock/dashboard-data"
import type { KycDocument } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"

const columns: DataTableColumn<KycDocument>[] = [
  { header: "Document", cell: (row) => <span className="font-medium">{row.name}</span> },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Updated", cell: (row) => row.updatedAt ?? "Not uploaded" },
]

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        title="Compliance / KYC"
        description="Review merchant profile, verification status, document checklist, business information, risk level, and compliance warnings."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="KYC status" value={merchant.kycStatus} detail="Required before live processing" icon={ShieldCheck} tone="warning" />
        <StatCard title="Risk level" value={merchant.riskLevel} detail="Manual review for settlement changes" icon={AlertTriangle} tone="warning" />
        <StatCard title="Expected volume" value={formatMoney(merchant.expectedMonthlyVolume)} detail="Monthly processing estimate" icon={Building2} />
        <StatCard title="Avg transaction" value={formatMoney(merchant.averageTransactionSize)} detail="Declared during onboarding" icon={FileCheck2} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Merchant profile</CardTitle>
            <CardDescription>{merchant.businessName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ProfileRow label="Trading name" value={merchant.tradingName} />
            <ProfileRow label="Registration" value={merchant.registrationNumber} />
            <ProfileRow label="Tax number" value={merchant.taxNumber ?? "Not supplied"} />
            <ProfileRow label="Industry" value={merchant.industry} />
            <ProfileRow label="Address" value={`${merchant.address}, ${merchant.city}`} />
            <ProfileRow label="Contact" value={`${merchant.contactPerson} · ${merchant.email}`} />
          </CardContent>
        </Card>
        <DataTable data={kycDocuments} columns={columns} getRowKey={(row) => row.id} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upload compliance information</CardTitle>
          <CardDescription>Merchants submit documents here. Files are not uploaded yet, but this mirrors the production KYC collection flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {kycDocuments.map((document) => (
              <MockForm
                key={document.id}
                className="rounded-lg border bg-muted/20 p-4"
                submitLabel={`Submit ${document.name}`}
                message={`${document.name} selected for mock submission. Production will upload the file to secure storage and create an audit log.`}
              >
                <div className="grid gap-3">
                  <div>
                    <p className="text-sm font-semibold">{document.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Current status: {document.status}</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`file-${document.id}`}>Upload file</Label>
                    <Input id={`file-${document.id}`} type="file" accept=".pdf,.png,.jpg,.jpeg" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`note-${document.id}`}>Reviewer note</Label>
                    <Textarea id={`note-${document.id}`} placeholder="Add optional context for compliance review" />
                  </div>
                </div>
              </MockForm>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
        Merchants should not go live until required KYC checks, risk review, and settlement account verification are completed.
      </div>
    </>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[130px_1fr]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
