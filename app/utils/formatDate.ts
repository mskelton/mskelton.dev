import metadata from "~/data/metadata"

export default function formatDate(date: string) {
  return new Date(date).toLocaleDateString(metadata.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
