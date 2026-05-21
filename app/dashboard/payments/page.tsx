"use client"

import { useMemo, useState } from "react"
import { Download, Eye, RotateCcw, Send } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { PageHeader } from "@/components/dashboard/page-header"
import { ProviderBadge } from "@/components/dashboard/provider-badge"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { TransactionDetail } from "@/components/dashboard/transaction-detail"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { transactions } from "@/lib/mock/dashboard-data"
import type { Transaction } from "@/lib/types/dashboard"
import { formatMoney } from "@/lib/utils/format-money"
import { maskPhone } from "@/lib/utils/mask-phone"
import { toCsv } from "@/lib/utils/to-csv"

export default function PaymentsPage() {
  const [selected, setSelected] = useState<Transaction | null>(null)
  const settledTotal = useMemo(
    () => transactions.filter((transaction) => transaction.settlementStatus === "Settled").reduce((sum, transaction) => sum + transaction.netAmount, 0),
    []
  )

  return (
    <>
      <PageHeader
        title="Payments"
        description="Search and review provider references, merchant references, customer phones, fees, settlement status, webhook delivery, and support actions."
        actions={
          <ActionButton
            variant="outline"
            action={{
              type: "download",
              filename: "transactions.csv",
              content: toCsv(
                transactions.map((transaction) => ({
                  id: transaction.id,
                  providerReference: transaction.providerReference,
                  merchantReference: transaction.merchantReference,
                  customerPhone: maskPhone(transaction.customerPhone),
                  provider: transaction.provider,
                  amount: transaction.amount,
                  fees: transaction.fees,
                  netAmount: transaction.netAmount,
                  status: transaction.status,
                  settlementStatus: transaction.settlementStatus,
                  date: transaction.date,
                }))
              ),
            }}
          >
            <Download className="size-4" /> Export CSV
          </ActionButton>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Summary title="Gross processed" value={formatMoney(transactions.reduce((sum, transaction) => sum + transaction.amount, 0))} />
        <Summary title="Fees deducted" value={formatMoney(transactions.reduce((sum, transaction) => sum + transaction.fees, 0))} />
        <Summary title="Settled net amount" value={formatMoney(settledTotal)} />
      </div>
      <FilterBar searchPlaceholder="Search transaction, reference, branch, customer" />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Provider reference</TableHead>
                <TableHead>Merchant reference</TableHead>
                <TableHead>Customer phone</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Fees</TableHead>
                <TableHead className="text-right">Net amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Settlement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.providerReference}</TableCell>
                  <TableCell>{transaction.merchantReference}</TableCell>
                  <TableCell>{maskPhone(transaction.customerPhone)}</TableCell>
                  <TableCell><ProviderBadge provider={transaction.provider} /></TableCell>
                  <TableCell className="text-right">{formatMoney(transaction.amount)}</TableCell>
                  <TableCell className="text-right">{formatMoney(transaction.fees)}</TableCell>
                  <TableCell className="text-right">{formatMoney(transaction.netAmount)}</TableCell>
                  <TableCell><StatusBadge status={transaction.status} /></TableCell>
                  <TableCell><StatusBadge status={transaction.settlementStatus} /></TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon-xs" variant="ghost" onClick={() => setSelected(transaction)} aria-label="View transaction">
                        <Eye className="size-4" />
                      </Button>
                      <ActionButton
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Request refund"
                        action={{ type: "message", message: `Refund review opened for ${transaction.id}. Backend approval workflow still needs integration.` }}
                      >
                        <RotateCcw className="size-4" />
                      </ActionButton>
                      <ActionButton
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Resend webhook"
                        action={{ type: "message", message: `Webhook resend queued for ${transaction.id}. Real delivery requires backend webhook jobs.` }}
                      >
                        <Send className="size-4" />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
        Refunds and webhook resends are sensitive actions. In production they must require permission checks, reason capture, and immutable audit log records.
      </div>
      <TransactionDetail transaction={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  )
}

function Summary({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
