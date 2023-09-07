import { Metadata } from "next"
import type { ArticleMeta } from "../../components/layouts/ArticleLayout"

export function getMetadata(meta: ArticleMeta): Metadata {
  return {
    description: meta.description,
    title: `${meta.title} | Mark Skelton’s Blog`,
  }
}
