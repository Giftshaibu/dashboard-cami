import { Bell, Brush, CreditCard, LockKeyhole, Settings, ShieldCheck, SlidersHorizontal } from "lucide-react"

import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { merchant } from "@/lib/mock/dashboard-data"

const sections = [
  { title: "Business profile", description: "Legal name, trading name, support contacts, website, and merchant category.", icon: Settings },
  { title: "Settlement account", description: "Verified bank or wallet destination. Changes should require review and audit logging.", icon: CreditCard },
  { title: "Notification preferences", description: "Email, SMS, in-dashboard alerts, and webhook failure notifications.", icon: Bell },
  { title: "Checkout branding", description: "Business logo, checkout name, brand color, success and failed payment URLs.", icon: Brush },
  { title: "Payment method settings", description: "Enable Airtel Money and TNM Mpamba, with transaction limits per method.", icon: SlidersHorizontal },
  { title: "Security settings", description: "Two-factor authentication, session expiry, IP allowlisting, and device management.", icon: LockKeyhole },
  { title: "Limits", description: "Minimum and maximum transaction amount, refund limits, and manual review thresholds.", icon: ShieldCheck },
]

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure business profile, settlement account, notifications, checkout branding, payment methods, security, and limits."
      />
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Business profile</CardTitle>
            <CardDescription>Mock form fields for merchant settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <MockForm
              className="grid gap-4"
              submitLabel="Save settings"
              message="Settings saved in mock mode. Backend persistence and audit logs still need integration."
            >
            <div className="grid gap-2">
              <Label>Business name</Label>
              <Input value={merchant.businessName} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Trading name</Label>
              <Input value={merchant.tradingName} readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Settlement account</Label>
              <Input value="National Bank •••• 1842" readOnly />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              Settlement account changes should require verification, elevated permissions, and audit logging.
            </div>
            </MockForm>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon

            return (
              <Card key={section.title}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <SettingRow label="Enabled" />
                  <Select defaultValue="standard">
                    <option value="standard">Standard review</option>
                    <option value="strict">Strict approval</option>
                    <option value="disabled">Disabled</option>
                  </Select>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Checkout messaging</CardTitle>
          <CardDescription>Customer-facing copy should stay clear and avoid sensitive credential collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea value="Customers approve Airtel Money or TNM Mpamba payments only through the official provider prompt. Never share your mobile money PIN with anyone." readOnly />
        </CardContent>
      </Card>
    </>
  )
}

function SettingRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span className="text-sm font-medium">{label}</span>
      <Switch defaultChecked />
    </div>
  )
}
