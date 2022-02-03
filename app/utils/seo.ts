interface SEOOptions {
  description: string
  title: string
  [key: string]: string | string[]
}

export const seo = ({ description, title, ...rest }: SEOOptions) => ({
  description,
  "og:description": description,
  "og:title": title,
  "twitter:description": description,
  "twitter:title": title,
  ...rest,
})
