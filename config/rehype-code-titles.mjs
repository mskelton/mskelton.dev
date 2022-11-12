import { visit } from "unist-util-visit"

const className = [
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
]

export default function rehypeCodeTitles() {
  const visitor = (node) => {
    if (node.tagName !== "pre") {
      return
    }

    // Extract the language class from the code block to add the titles
    const code = Array.isArray(node.children) ? node.children[0] : node.children
    const [lang, title] = (code.properties.className || [])
      .filter((cls) => cls.startsWith("language-"))
      .join("")
      .split(":")

    if (!title) {
      return
    }

    node.properties.className = ["relative", "pt-12", "peer", "has-title"]
    node.children = [
      {
        children: [{ type: "text", value: title }],
        properties: { className },
        tagName: "div",
        type: "element",
      },
      { ...code, properties: { className: [lang] } },
    ]
  }

  return (tree) => visit(tree, "element", visitor)
}
