import type { Parent } from "unist-util-visit"

export async function remarkCodeTitles() {
  const { visit } = await import("unist-util-visit")

  return () => (tree: Parent & { lang?: string }) =>
    visit(tree, "code", (node: Parent & { lang?: string }, index: number) => {
      const nodeLang = node.lang || ""
      let language = ""
      let title = ""

      if (nodeLang.includes(":")) {
        language = nodeLang.slice(0, nodeLang.search(":"))
        title = nodeLang.slice(nodeLang.search(":") + 1, nodeLang.length)
      }

      if (!title) {
        return
      }

      const className = "remark-code-title"
      const titleNode = {
        attributes: [
          { name: "className", type: "mdxJsxAttribute", value: className },
        ],
        children: [{ type: "text", value: title }],
        data: { _xdmExplicitJsx: true },
        name: "div",
        type: "mdxJsxFlowElement",
      }

      tree.children.splice(index, 0, titleNode)
      node.lang = language
    })
}
