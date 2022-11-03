import { visit } from "unist-util-visit"

const className = [
  "relative",
  "top-8",
  "right-8",
  "bg-zinc-800",
  "px-8",
  "py-2",
  "text-white",
  "text-xs",
  "-m-8",
  // width: calc(100% + 64px);
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

    node.properties.className = ["relative"]
    node.children = [
      {
        children: [{ type: "text", value: title }],
        properties: { className },
        type: "element",
        tagName: "div",
      },
      { ...code, properties: { className: [lang] } },
    ]
  }

  return (tree) => visit(tree, "element", visitor)
}
