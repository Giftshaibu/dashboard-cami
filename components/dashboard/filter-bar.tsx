"use client"

import { Calendar, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export function FilterBar({
  searchPlaceholder = "Search records",
  provider = true,
  statusOptions = ["All statuses", "Successful", "Pending", "Failed", "Refunded", "Settled", "Mismatch"],
}: {
  searchPlaceholder?: string
  provider?: boolean
  statusOptions?: string[]
}) {
  return (
    <div className="grid gap-3 rounded-lg border bg-card p-3 md:grid-cols-[1fr_180px_180px_180px]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder={searchPlaceholder} />
      </div>
      {provider ? (
        <Select defaultValue="all">
          <option value="all">All providers</option>
          <option value="airtel">Airtel Money</option>
          <option value="tnm">TNM Mpamba</option>
        </Select>
      ) : null}
      <Select defaultValue="all">
        {statusOptions.map((status) => (
          <option key={status} value={status.toLowerCase().replaceAll(" ", "-")}>
            {status}
          </option>
        ))}
      </Select>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" type="date" />
      </div>
    </div>
  )
}
