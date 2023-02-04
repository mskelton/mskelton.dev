import React from "react"
import { ArticleMeta } from "components/ArticleLayout"

export function ArticleHead({ meta }: ArticleHeadProps) {
  return (
    <>
      <title>{`${meta.title} - Mark Skelton's Blog`}</title>
      <meta content={meta.description} name="description" />
    </>
  )
}

export interface ArticleHeadProps {
  meta: ArticleMeta
}
