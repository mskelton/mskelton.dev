import { visit } from "unist-util-visit"

export default function rehypeCodeA11y() {
  const visitor = (node) => {
    if (node.tagName !== "pre") {
      return
    }

    // Add `tabindex="0"` to the code element to make it scrollable
    const code = Array.isArray(node.children) ? node.children[0] : node.children
    code.properties.tabindex = "0"
  }

  return (tree) => visit(tree, "element", visitor)
}
