export type AuthorFrontMatter = {
  avatar: string
  company: string
  email: string
  github: string
  layout?: string
  linkedin: string
  name: string
  occupation: string
  twitter: string
}

export type PostFrontMatter = {
  date: string
  fileName: string
  images?: string[]
  slug: string
  summary: string
  tags: string[]
  title: string
}

export type FrontMatter<T extends "blog" | "authors"> = T extends "blog"
  ? PostFrontMatter
  : AuthorFrontMatter
