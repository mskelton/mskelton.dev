import rangeParser from "parse-numeric-range"
import { SKIP, visit } from "unist-util-visit"

function calculateLinesToHighlight(meta) {
  const [range] = meta
    .filter((item) => item.startsWith("{"))
    .map((item) => item.slice(1, -1))

  if (range) {
    const lineNumbers = rangeParser(range)
    return (index) => lineNumbers.includes(index + 1)
  } else {
    return () => false
  }
}

export default function rehypeCodeMeta() {
  const visitor = (node) => {
    const shouldHighlight = calculateLinesToHighlight(
      node.data?.attributes ?? [],
    )

    visit(
      node,
      (t) => t.type === "element" && t.properties?.className?.includes("line"),
      (line, index, parent) => {
        if (!line.children.length && index !== parent.children.length - 1) {
          // Add a zero-width space to allow highlighting over empty lines
          line.children.push({ type: "text", value: "\u200b" })
        }

        if (shouldHighlight(index)) {
          line.properties.className ??= []
          line.properties.className.push("highlight")
        }
      },
    )

    return SKIP
  }

  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      visitor,
    )
  }
}
