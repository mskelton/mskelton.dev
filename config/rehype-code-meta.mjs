import rangeParser from "parse-numeric-range"
import { SKIP, visit } from "unist-util-visit"

function calculateLines(meta, char) {
  const [range] = meta
    .filter((item) => item.startsWith(char))
    .map((item) => item.slice(1, -1))

  if (range) {
    const lineNumbers = rangeParser(range)
    return (index) => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

export default function rehypeCodeMeta() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        const attrs = node.data?.attributes ?? []
        const shouldHighlight = calculateLines(attrs, "{")
        const shouldFocus = calculateLines(attrs, "[")

        visit(
          node,
          (t) =>
            t.type === "element" && t.properties?.className?.includes("line"),
          (line, index, parent) => {
            if (!line.children.length && index !== parent.children.length - 1) {
              // Add a zero-width space to allow highlighting over empty lines
              line.children.push({ type: "text", value: "\u200b" })
            }

            if (shouldHighlight(index)) {
              line.properties.className ??= []
              line.properties.className.push("highlight")
            }

            if (shouldFocus(index)) {
              line.properties.className ??= []
              line.properties.className.push("focus")

              // Add a prop that indicates that this code block has focused
              // so we can display an expand/collapse button.
              node.properties.hasFocus = true
            }
          },
        )

        return SKIP
      },
    )
  }
}
