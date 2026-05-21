import { Clock, Info, QrCode, Send } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { MockForm } from "@/components/dashboard/mock-form"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"

export default function AcceptPaymentPage() {
  const previewPhone = "0991234321"
  const previewAmount = 85000

  return (
    <>
      <PageHeader
        title="Accept Payment"
        description="Create manual Airtel Money or TNM Mpamba payment requests for in-store, support, and sales-assisted workflows."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>Manual payment request</CardTitle>
            <CardDescription>Send a provider payment prompt without asking the customer for their mobile money PIN.</CardDescription>
          </CardHeader>
          <CardContent>
            <MockForm
              className="grid gap-5"
              submitLabel={<><Send className="size-4" /> Generate payment request</>}
              message="Mock payment request generated. Real Airtel Money/TNM Mpamba prompts require backend provider integration."
            >
            <div className="grid gap-2">
              <Label htmlFor="customer-phone">Customer phone</Label>
              <Input id="customer-phone" inputMode="tel" placeholder="099****321" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" inputMode="numeric" placeholder="MWK 85,000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Samsung A15 deposit" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Provider</Label>
                <Select defaultValue="auto">
                  <option value="auto">Auto-detect provider</option>
                  <option value="airtel">Airtel Money</option>
                  <option value="tnm">TNM Mpamba</option>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Expiry time</Label>
                <Select defaultValue="15">
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </Select>
              </div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
              Customers should never share mobile money PINs. They approve payment only through the official provider prompt on their own phone.
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButton
                variant="outline"
                action={{
                  type: "download",
                  filename: "payment-request-qr-placeholder.txt",
                  content: "QR placeholder for mock payment request\nMerchant: Mwai Phones & Electronics\nAmount: MWK 85,000\nProvider: Auto-detect",
                }}
              >
                <QrCode className="size-4" /> Generate QR
              </ActionButton>
            </div>
            </MockForm>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer preview</CardTitle>
              <CardDescription>What the customer should expect from the payment request.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Merchant</p>
                    <p className="font-semibold">Mwai Phones & Electronics</p>
                  </div>
                  <ProviderBadge provider="Airtel Money" />
                </div>
                <div className="mt-6 space-y-3">
                  <PreviewRow label="Customer" value={maskPhone(previewPhone)} />
                  <PreviewRow label="Amount" value={formatMoney(previewAmount)} />
                  <PreviewRow label="Reason" value="Samsung A15 deposit" />
                  <PreviewRow label="Expires" value="15 minutes" />
                </div>
              </div>
              <div className="flex gap-3 rounded-lg border p-4 text-sm leading-6 text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0" />
                <p>The dashboard only initiates the provider flow. PIN entry happens on the customer&apos;s secure mobile money channel.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <Clock className="size-5 text-muted-foreground" />
              <p className="text-sm leading-6 text-muted-foreground">Expired requests should be recreated instead of reused, preserving a clean audit trail.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
