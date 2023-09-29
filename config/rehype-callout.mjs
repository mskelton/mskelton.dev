import { SKIP, visit } from "unist-util-visit"
import { error, info, warn } from "./icons.mjs"

const regex = /\[!(INFO|WARN|ERROR)(\s.*)?\]/

const iconMap = {
  ERROR: error,
  INFO: info,
  WARN: warn,
}

export default function rehypeCallout() {
  const visitor = (node, index, parent) => {
    const children = node.children
      .filter((child) => child.type === "element")
      .flatMap((child) => child.children)

    const [first] = children
    const match = first?.type === "text" ? first.value.match(regex) : null

    if (!match) {
      return
    }

    const title = match[1]
    const icon = iconMap[title] ?? info

    parent.children.splice(index, 1, {
      children: [
        icon,
        {
          children: [{ type: "text", value: title }],
          properties: { className: "" },
          tagName: "strong",
          type: "element",
        },
        {
          children: children.slice(2),
          properties: { className: "" },
          tagName: "div",
          type: "element",
        },
      ],
      properties: {
        className: ["callout"],
      },
      tagName: "aside",
      type: "element",
    })

    return SKIP
  }

  return (tree) =>
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "blockquote",
      visitor,
    )
}
