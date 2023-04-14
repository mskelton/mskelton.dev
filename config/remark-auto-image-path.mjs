import path from "node:path"
import { visit } from "unist-util-visit"

/**
 * Automatically add the directory path to images.
 */
export default function remarkAutoImagePath() {
  return (ast, vfile) => {
    const dir = path.basename(path.dirname(vfile.history[0]))

    visit(ast, "image", (node) => {
      node.url = path.join(dir, node.url)
    })

    visit(ast, "mdxJsxFlowElement", (node) => {
      if (node.name !== "ImageComparison") return

      node.attributes.push({
        name: "dir",
        type: "mdxJsxAttribute",
        value: dir,
      })
    })
  }
}
