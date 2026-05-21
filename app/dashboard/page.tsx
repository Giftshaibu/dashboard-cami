import { AlertTriangle, Banknote, CheckCircle2, Clock3, CreditCard, Landmark, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

import { ActionButton } from "@/components/dashboard/action-button"
import { CollectionsTrendChart, ProviderCollectionsChart } from "@/components/dashboard/dashboard-charts"
import { DataTable, type DataTableColumn } from "@/components/dashboard/data-table"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { transactions } from "@/lib/mock/dashboard-data"
import type { Transaction } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"
import { toCsv } from "@/lib/utils/to-csv"

const todayTransactions = transactions.filter((transaction) => transaction.date.startsWith("2026-05-21"))
const todayCollections = todayTransactions
  .filter((transaction) => ["Successful", "Settled"].includes(transaction.status))
  .reduce((sum, transaction) => sum + transaction.amount, 0)
const successfulPayments = todayTransactions.filter((transaction) => ["Successful", "Settled"].includes(transaction.status)).length
const pendingPayments = todayTransactions.filter((transaction) => transaction.status === "Pending").length
const failedPayments = todayTransactions.filter((transaction) => transaction.status === "Failed").length
const availableBalance = 1402875
const pendingSettlement = 901875

const columns: DataTableColumn<Transaction>[] = [
  { header: "Transaction", cell: (row) => <div><p className="font-medium">{row.id}</p><p className="text-xs text-muted-foreground">{row.merchantReference}</p></div> },
  { header: "Customer", cell: (row) => maskPhone(row.customerPhone) },
  { header: "Provider", cell: (row) => <ProviderBadge provider={row.provider} /> },
  { header: "Amount", cell: (row) => formatMoney(row.amount), className: "text-right" },
  { header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { header: "Date", cell: (row) => row.date },
]

export default function DashboardOverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="Track collections, settlement exposure, provider performance, failed payments, and operational alerts for your Malawi mobile money channels."
        actions={
          <ActionButton
            variant="outline"
            action={{
              type: "download",
              filename: "daily-summary.csv",
              content: toCsv(
                transactions.map((transaction) => ({
                  id: transaction.id,
                  provider: transaction.provider,
                  amount: transaction.amount,
                  fees: transaction.fees,
                  netAmount: transaction.netAmount,
                  status: transaction.status,
                  date: transaction.date,
                }))
              ),
            }}
          >
            Download daily summary
          </ActionButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Today's collections" value={formatMoney(todayCollections)} detail="Successful Airtel Money and Mpamba collections" icon={Banknote} tone="success" />
        <StatCard title="Successful payments" value={successfulPayments.toString()} detail="Confirmed by provider today" icon={CheckCircle2} tone="success" />
        <StatCard title="Pending payments" value={pendingPayments.toString()} detail="Awaiting customer authorization" icon={Clock3} tone="warning" />
        <StatCard title="Failed payments" value={failedPayments.toString()} detail="Provider timeout or customer cancellation" icon={TrendingDown} tone="danger" />
        <StatCard title="Available balance" value={formatMoney(availableBalance)} detail="Ready for next merchant payout" icon={CreditCard} />
        <StatCard title="Pending settlement" value={formatMoney(pendingSettlement)} detail="Collections queued for settlement" icon={Landmark} tone="warning" />
        <StatCard title="Total refunds" value={formatMoney(45000)} detail="Refunded or reversed this period" icon={TrendingUp} />
        <StatCard title="Next settlement" value="May 22" detail="Expected after provider reconciliation" icon={Clock3} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <CollectionsTrendChart />
        <ProviderCollectionsChart />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Recent transactions</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/payments">View all</Link>
            </Button>
          </div>
          <DataTable data={transactions.slice(0, 5)} columns={columns} getRowKey={(row) => row.id} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Items that need finance, support, or developer attention.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <AlertItem title="Webhook retrying" detail="Refund webhook has failed 3 times and needs developer review." tone="warning" />
            <AlertItem title="Settlement on hold" detail="TNM Mpamba mismatch is blocking one settlement batch." tone="danger" />
            <AlertItem title="KYC update required" detail="Bank confirmation letter is pending verification." tone="warning" />
            <AlertItem title="Provider status" detail="Airtel Money and TNM Mpamba channels are accepting requests." tone="success" />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function AlertItem({ title, detail, tone }: { title: string; detail: string; tone: "success" | "warning" | "danger" }) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <div className={tone === "danger" ? "text-red-600" : tone === "warning" ? "text-amber-600" : "text-emerald-600"}>
        <AlertTriangle className="size-5" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
      </div>
    </div>
  )
}
