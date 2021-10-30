/* eslint-disable react/display-name */
import { getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"
import Image from "./Image"
import CustomLink from "./Link"
import { BlogNewsletterForm } from "./NewsletterForm"
import Pre from "./Pre"
import TOCInline from "./TOCInline"

export const MDXComponents = {
  a: CustomLink,
  BlogNewsletterForm,
  Image,
  pre: Pre,
  TOCInline,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export default function MDXLayoutRenderer({ layout, mdxSource, ...rest }) {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents} layout={layout} {...rest} />
}
