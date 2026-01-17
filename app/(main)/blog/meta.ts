import { Metadata } from "next"
import type { PostMeta } from "~/components/layouts/PostLayout"

export function getMetadata(meta: PostMeta): Metadata {
  return {
    description: meta.description,
    title: `${meta.title} | Mark Skelton`,
  }
}
