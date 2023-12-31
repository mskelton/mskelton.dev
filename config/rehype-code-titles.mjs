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
        "py-3",
        "px-4",
        "bg-white",
        "dark:bg-[#24292e]",
        "border-t",
        "border-x",
        "border-zinc-300",
        "dark:border-zinc-700",
        "text-zinc-800",
        "dark:text-zinc-300",
        "text-xs",
        "font-mono",
        "rounded-t-lg",
      ],
    },
    tagName: "div",
    type: "element",
  }
}

export default function rehypeCodeTitles() {
  return (tree) =>
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node, index, parent) => {
        const { meta, title } = node.data ?? {}

        // Add a prop that indicates that this code block has a title
        node.properties.hasTitle = !!title

        // Wrap the code block in a div with the title
        parent.children[index] = {
          children: title ? [createTitle(title), node] : [node],
          properties: {
            className: [
              "code-block group",
              title ? "has-title" : "",
              meta?.demo && "demo",
            ].filter(Boolean),
          },
          tagName: "div",
          type: "element",
        }

        return SKIP
      },
    )
}
