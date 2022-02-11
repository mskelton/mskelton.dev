export type AuthorFrontMatter = {
  company: string
  occupation: string
}

export type PostFrontMatter = {
  date: string
  fileName: string
  images?: string[]
  lastmod?: string
  layout?: string
  slug: string
  summary?: string
  tags: string[]
  title: string
}

export type FrontMatter<T extends "blog" | "authors"> = T extends "blog"
  ? PostFrontMatter
  : AuthorFrontMatter
