/* eslint-disable react/display-name */
import { ComponentMap, getMDXComponent } from "mdx-bundler/client"
import { ReactNode, useMemo } from "react"
import Link from "./Link"
import { MarkdownImage } from "./MarkdownImage"
import Pre from "./Pre"

interface WrapperProps {
  children?: ReactNode
  layout?: string
}

function Wrapper({ layout, ...rest }: WrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Layout = require(`../layouts/${layout}`).default
  return <Layout {...rest} />
}

export const MDXComponents: ComponentMap = {
  a: Link as any,
  img: MarkdownImage as any,
  pre: Pre,
  wrapper: Wrapper,
}

interface Props {
  [key: string]: unknown
  layout: string
  mdxSource: string
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout components={MDXComponents} layout={layout} {...rest} />
}