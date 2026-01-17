import type { PostMeta } from "components/layouts/PostLayout"
import { Metadata } from "next"

export function getMetadata(meta: PostMeta): Metadata {
  return {
    description: meta.description,
    title: `${meta.title} | Mark Skelton`,
  }
}
