const pad = (n: number) => (n < 10 ? `0${n}` : n)

export function toDateString(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`
}

export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(`${date}T00:00:00Z`) : date

  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  })
}
