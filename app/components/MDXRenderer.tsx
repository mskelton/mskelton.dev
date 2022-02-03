import clsx from "clsx"
import { ComponentMap, getMDXComponent } from "mdx-bundler/client"
import { useMemo } from "react"
import { Link } from "./Link"
import { MarkdownImage } from "./MarkdownImage"
import { Pre } from "./Pre"

const componentMap: ComponentMap = {
  a: ({ className, ...props }) => (
    <Link {...props} className={clsx("link-primary", className)} />
  ),
  img: MarkdownImage,
  pre: Pre,
}

export interface MDXRendererProps {
  layout: ComponentMap["wrapper"]
  source: string
  [key: string]: unknown
}

export const MDXRenderer = ({ layout, source, ...props }: MDXRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(source), [source])

  return (
    <MDXLayout
      components={{ ...componentMap, wrapper: layout as any }}
      {...props}
    />
  )
}
