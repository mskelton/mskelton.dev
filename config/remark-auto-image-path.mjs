import path from "node:path"
import { visit } from "unist-util-visit"

/** Automatically add the directory path to images. */
export default function remarkAutoImagePath() {
  return (ast, vfile) => {
    const filename = vfile.history[0]
    const slug = path.basename(filename, path.extname(filename))

    visit(ast, "image", (node) => {
      node.url = path.join(slug, node.url)
    })

    visit(ast, "mdxJsxFlowElement", (node) => {
      if (node.name !== "ImageComparison") return

      node.attributes.push({
        name: "slug",
        type: "mdxJsxAttribute",
        value: slug,
      })
    })
  }
}
