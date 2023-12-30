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
        "bg-zinc-950",
        "border",
        "border-zinc-700",
        "text-zinc-300",
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
  const visitor = (node, index, parent) => {
    const code = Array.isArray(node.children) ? node.children[0] : node.children
    const meta = code.data?.meta

    const regex = /[{[][\d,-]+[}\]]/
    const parsed = (typeof meta === "string" ? meta : "")
      .split(" ")
      .filter(Boolean)
    const [title] = parsed.filter((cls) => !regex.test(cls))
    const rest = parsed?.filter((cls) => cls !== title)

    // Add remaining metadata to the pre element
    node.data ??= {}
    node.data.attributes = rest

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
  }

  return (tree) =>
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      visitor,
    )
}
