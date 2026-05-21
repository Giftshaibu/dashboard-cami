import { Download, FileText } from "lucide-react"

import { ActionButton } from "@/components/dashboard/action-button"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { reports } from "@/lib/mock/dashboard-data"

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Finance, operations, tax, provider performance, refunds, fees, settlements, and failed payment reports with export actions."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </div>
                <FileText className="size-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{report.cadence}</span>
                <span className="font-medium">{report.lastGenerated}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <ActionButton
                  size="sm"
                  variant="outline"
                  action={{ type: "download", filename: `${report.title.toLowerCase().replaceAll(" ", "-")}.csv`, content: `Report,${report.title}\nDescription,${report.description}\nGenerated,${report.lastGenerated}` }}
                >
                  <Download className="size-4" /> CSV
                </ActionButton>
                <ActionButton
                  size="sm"
                  variant="outline"
                  action={{ type: "download", filename: `${report.title.toLowerCase().replaceAll(" ", "-")}.xlsx.txt`, content: `${report.title}\nExcel export placeholder. Backend Excel generation required for production.` }}
                >
                  <Download className="size-4" /> Excel
                </ActionButton>
                <ActionButton
                  size="sm"
                  variant="outline"
                  action={{ type: "download", filename: `${report.title.toLowerCase().replaceAll(" ", "-")}.pdf.txt`, content: `${report.title}\nPDF export placeholder. Backend PDF generation required for production.` }}
                >
                  <Download className="size-4" /> PDF
                </ActionButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
