import { slug } from "github-slugger"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"

export default function remarkTocHeadings(options) {
  return (tree) =>
    visit(tree, "heading", (node, index, parent) => {
      const textContent = toString(node)
      options.exportRef.push({
        depth: node.depth,
        url: "#" + slug(textContent),
        value: textContent,
      })
    })
}
