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

    const [_, type, title] = match
    const icon = iconMap[type] ?? info

    parent.children.splice(index, 1, {
      children: [
        {
          ...icon,
          properties: {
            ...icon.properties,
            class: [
              "w-9 h-9 absolute top-1 right-1 p-1.5",
              type === "INFO" && "text-indigo-600 dark:text-indigo-400",
              type === "WARN" && "text-yellow-700 dark:text-yellow-500",
              type === "ERROR" && "text-red-600 dark:text-red-500",
            ].filter(Boolean),
          },
        },
        {
          children: [{ type: "text", value: title }],
          properties: {
            className: "text-zinc-900 dark:text-white font-bold mb-2 block",
          },
          tagName: "strong",
          type: "element",
        },
        {
          children: children.slice(2),
          properties: { className: "text-zinc-700 dark:text-zinc-200" },
          tagName: "div",
          type: "element",
        },
      ],
      properties: {
        class: [
          "px-4 -mx-4 relative dark:text-white",
          "sm:rounded sm:-mr-6 sm:-ml-7 py-4 sm:px-6 sm:border-l-4",
          type === "INFO" &&
            "bg-indigo-300/50 border-indigo-500 dark:bg-indigo-900/50 dark:border-indigo-500",
          type === "WARN" &&
            "bg-yellow-300/50 border-yellow-500 dark:bg-yellow-900/50 dark:border-yellow-500",
          type === "ERROR" &&
            "bg-red-300/50 border-red-500 dark:bg-red-900/50 dark:border-red-500",
        ].filter(Boolean),
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
