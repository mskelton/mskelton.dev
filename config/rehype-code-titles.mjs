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
    const [lang, ...meta] = (code.properties.className || [])
      .filter((cls) => cls.startsWith("language-"))
      .join("")
      .split(":")

    const regex = /{[\d,-]+}/
    const [title] = meta.filter((cls) => !regex.test(cls))
    const rest = meta.filter((cls) => cls !== title)

    // Add the language to the code block so Shiki can highlight it
    code.properties.className = [lang]

    // Wrap the code block in a div with the title
    parent.children[index] = {
      children: title ? [createTitle(title), node] : [node],
      data: {
        // Add the remaining metadata to the parent div. This is required
        // since rehype-shiki replaces the pre and code elements.
        meta: rest,
      },
      properties: {
        className: [
          "group relative mx-0 sm:-mx-8",
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
