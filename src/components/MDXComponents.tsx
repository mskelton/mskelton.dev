/* eslint-disable react/display-name */
import clsx from "clsx"
import { ComponentMap, getMDXComponent } from "mdx-bundler/client"
import { ReactNode, useMemo } from "react"
import { Link } from "./Link"
import { MarkdownImage } from "./MarkdownImage"
import { Pre } from "./Pre"

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
  a: ({ className, ...props }) => (
    <Link {...props} className={clsx("link-primary", className)} />
  ),
  img: MarkdownImage,
  pre: Pre,
  wrapper: Wrapper,
}

interface Props {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout components={MDXComponents} layout={layout} {...rest} />
}
