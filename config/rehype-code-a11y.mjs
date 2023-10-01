import { visit } from "unist-util-visit"

export default function rehypeCodeA11y() {
  return (tree) =>
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        const code = Array.isArray(node.children)
          ? node.children[0]
          : node.children

        // Add `tabindex="0"` to the code element to make it scrollable
        code.properties.tabindex = "0"
      },
    )
}
