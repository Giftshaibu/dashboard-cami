export function toCsv(rows: Array<Record<string, string | number | undefined>>) {
  if (rows.length === 0) {
    return ""
  }

  const headers = Object.keys(rows[0])
  const lines = rows.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? ""
        return `"${String(value).replaceAll('"', '""')}"`
      })
      .join(",")
  )

  return [headers.join(","), ...lines].join("\n")
}
