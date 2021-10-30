import siteMetadata from "data/siteMetadata"

export default function formatDate(date: string) {
  return new Date(date).toLocaleDateString(siteMetadata.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
