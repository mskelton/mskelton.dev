import { SKIP, visit } from "unist-util-visit"

export default function rehypeParseCodeMeta() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        // const attrs = node.data?.attributes ?? []
        // const highlight = calculateLines(attrs, "{")
        // const focus = calculateLines(attrs, "[")
        //
        // if (attrs.includes("showLineNumbers")) {
        //   node.properties.className ??= []
        //   node.properties.className.push("line-numbers")
        // }
        //
        // visit(
        //   node,
        //   (t) =>
        //     t.type === "element" && t.properties?.className?.includes("line"),
        //   (line, index, parent) => {
        //     if (!line.children.length && index !== parent.children.length - 1) {
        //       // Add a zero-width space to allow highlighting over empty lines
        //       line.children.push({ type: "text", value: "\u200b" })
        //     }
        //
        //     if (highlight.test(index)) {
        //       line.properties.className ??= []
        //       line.properties.className.push("highlight")
        //
        //       // Add a prop that indicates that this code block has focused
        //       // so we can display an expand/collapse button.
        //       node.properties.hasHighlight = true
        //     }
        //
        //     if (focus.test(index)) {
        //       line.properties.className ??= []
        //       line.properties.className.push("focus")
        //
        //       // Add a prop that indicates that this code block has focused
        //       // so we can display an expand/collapse button.
        //       node.properties.hasFocus = true
        //     }
        //   },
        // )
        //
        // if (highlight.highlighted()) {
        //   node.properties.className ??= []
        //   node.properties.className.push("highlight")
        // }
        //
        // if (focus.highlighted()) {
        //   node.properties.className ??= []
        //   node.properties.className.push("focus")
        // }
        //
        // return SKIP
      },
    )
  }
}
