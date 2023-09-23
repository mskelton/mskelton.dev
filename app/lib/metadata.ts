import { Metadata } from "next"
import { siteMeta } from "./siteMeta"

export function withOpenGraph({
  openGraph,
  twitter,
  ...props
}: Metadata): Metadata {
  const title = `${props.title} | Mark Skelton`
  const description = props.description || siteMeta.description

  return {
    ...props,
    description,
    metadataBase: new URL(siteMeta.url),
    openGraph: {
      description,
      images: ["/logo.png"],
      locale: "en_US",
      siteName: "Mark Skelton",
      title,
      type: "website",
      ...openGraph,
    },
    title,
    twitter: {
      card: "summary",
      description,
      images: ["/logo.png"],
      site: "@mskelton",
      title,
      ...twitter,
    },
  }
}
