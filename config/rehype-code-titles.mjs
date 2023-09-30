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

export default function rehypeCodeTitles() {
  const visitor = (node, index, parent) => {
    const code = Array.isArray(node.children) ? node.children[0] : node.children
    const meta = code.data?.meta

    // If the node is part of a demo, it's styles are slightly modified.
    if (meta?.demo) {
      node.properties ??= {}
      node.properties.className ??= []
      node.properties.className.push("demo")
      return
    }

    if (!meta) return
    const regex = /{[\d,-]+}/
    const parsed = meta.split(" ").filter(Boolean)
    const [title] = parsed.filter((cls) => !regex.test(cls))
    const rest = parsed.filter((cls) => cls !== title)

    // Add remaining metadata to the pre element
    node.data ??= {}
    node.data.attributes = rest

    // Wrap the code block in a div with the title
    parent.children[index] = {
      children: title ? [createTitle(title), node] : [node],
      properties: {
        className: [
          "code-block group relative",
          title ? "has-title pt-12" : "",
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
