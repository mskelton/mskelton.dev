import rangeParser from "parse-numeric-range"
import { SKIP, visit } from "unist-util-visit"

function createTitle(title) {
  return {
    children: [{ type: "text", value: title }],
    properties: {
      className: [
        "absolute",
        "top-0",
        "left-0",
        "right-0",
        "rounded-t-2xl",
        "px-8",
        "py-3",
        "bg-zinc-800",
        "text-white",
        "text-sm",
        "font-mono",
      ],
    },
    tagName: "div",
    type: "element",
  }
}

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

function extractMeta(node) {
  const code = Array.isArray(node.children) ? node.children[0] : node.children
  let meta = (code.properties.className || [])
    .filter((cls) => cls.startsWith("meta-"))
    .join("")
    .split(":")

  return {
    shouldHighlight: calculateLinesToHighlight(meta),
  }
}

export default function rehypeCodeTitles() {
  const visitor = (node, index, parent) => {
    if (node.tagName !== "pre") {
      return
    }

    const { shouldHighlight } = extractMeta(node)

    console.log(node.children[0])
    console.log(node.children[0].children)

    return SKIP
  }

  return (tree) => visit(tree, "element", visitor)
}
