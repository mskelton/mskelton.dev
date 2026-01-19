import { Metadata } from 'next'
import { siteMeta } from './siteMeta'

export function withOpenGraph({
  alternates,
  openGraph,
  twitter,
  ...props
}: Metadata): Metadata {
  const title = `${props.title} | Mark Skelton`
  const description = props.description || siteMeta.description

  return {
    ...props,
    alternates,
    description,
    metadataBase: new URL(siteMeta.url),
    openGraph: {
      description,
      locale: 'en_US',
      siteName: 'Mark Skelton',
      title,
      type: 'website',
      ...openGraph,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      site: '@mskelton',
      title,
      ...twitter,
    },
  }
}
