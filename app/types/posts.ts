export interface PostFrontMatter {
  date: string
  filePath: string
  images?: string[]
  slug: string
  summary: string
  tags: string[]
  title: string
}

export interface PostSource {
  name: string
  source: string
}
