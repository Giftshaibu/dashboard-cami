"use client"

import { useSyncExternalStore } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { collectionsTrend, providerChartData } from "@/lib/mock/dashboard-data"
import { formatMoney } from "@/lib/utils/format-money"

const providerColors = ["#dc2626", "#0284c7"]

export function ProviderCollectionsChart() {
  const mounted = useChartsMounted()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Airtel Money vs TNM Mpamba</CardTitle>
        <CardDescription>Provider collections for the current operating day.</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={240}>
            <BarChart data={providerChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="provider" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {providerChartData.map((entry, index) => (
                  <Cell key={entry.provider} fill={providerColors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </CardContent>
    </Card>
  )
}

export function CollectionsTrendChart() {
  const mounted = useChartsMounted()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments over time</CardTitle>
        <CardDescription>Weekly collection trend with failed-payment context.</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={240}>
            <LineChart data={collectionsTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => formatMoney(Number(value))} />
              <Line type="monotone" dataKey="collections" stroke="#18181b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ChartPlaceholder />
        )}
      </CardContent>
    </Card>
  )
}

function useChartsMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  )
}

function ChartPlaceholder() {
  return (
    <div className="flex h-full items-end gap-3">
      {[48, 68, 44, 74, 58, 82, 66].map((height, index) => (
        <div key={index} className="flex flex-1 items-end">
          <div className="w-full rounded-t-md bg-muted" style={{ height: `${height}%` }} />
        </div>
      ))}
    </div>
  )
}
