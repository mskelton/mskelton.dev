export type AuthorFrontMatter = {
  layout?: string
  name: string
  avatar: string
  occupation: string
  company: string
  email: string
  twitter: string
  linkedin: string
  github: string
}

export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  slug: string
  fileName: string
}

export type FrontMatter<T extends "blog" | "authors"> = T extends "blog"
  ? PostFrontMatter
  : AuthorFrontMatter
