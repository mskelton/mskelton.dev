import rangeParser from "parse-numeric-range"
import { SKIP, visit } from "unist-util-visit"

function calculateLines(meta, char) {
  let hasHighlights = false
  const [range] = meta
    .filter((item) => item.startsWith(char))
    .map((item) => item.slice(1, -1))

  const lineNumbers = range ? rangeParser(range) : []
  return {
    test: (index) => {
      const match = lineNumbers.includes(index + 1)
      hasHighlights = hasHighlights || match
      return match
    },
    highlighted: () => hasHighlights,
  }
}

export default function rehypeCodeMeta() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        const attrs = node.data?.attributes ?? []
        const highlight = calculateLines(attrs, "{")
        const focus = calculateLines(attrs, "[")

        if (attrs.includes("showLineNumbers")) {
          node.properties.className ??= []
          node.properties.className.push("line-numbers")
        }

        visit(
          node,
          (t) =>
            t.type === "element" && t.properties?.className?.includes("line"),
          (line, index, parent) => {
            if (!line.children.length && index !== parent.children.length - 1) {
              // Add a zero-width space to allow highlighting over empty lines
              line.children.push({ type: "text", value: "\u200b" })
            }

            if (highlight.test(index)) {
              line.properties.className ??= []
              line.properties.className.push("highlight")

              // Add a prop that indicates that this code block has focused
              // so we can display an expand/collapse button.
              node.properties.highlight = true
            }

            if (focus.test(index)) {
              line.properties.className ??= []
              line.properties.className.push("focus")

              // Add a prop that indicates that this code block has focused
              // so we can display an expand/collapse button.
              node.properties.focus = true
            }
          },
        )

        if (highlight.highlighted()) {
          node.properties.className ??= []
          node.properties.className.push("highlight")
        }

        if (focus.highlighted()) {
          node.properties.className ??= []
          node.properties.className.push("focus")
        }

        return SKIP
      },
    )
  }
}
