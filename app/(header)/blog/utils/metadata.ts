import { Metadata } from "next"
import { ArticleMeta } from "components/ArticleLayout"

export const articleMetadata = (meta: ArticleMeta): Metadata => ({
  description: meta.description,
  title: `${meta.title} - Mark Skelton’s Blog`,
})
