import fs from "node:fs/promises"
import path from "node:path"
import { SKIP, visit } from "unist-util-visit"

const getAttr = (node, name) => {
  return node.attributes.find((attr) => attr.name === name)?.value
}

export default function remarkCodeBlock() {
  return async (ast, vfile) => {
    const filename = vfile.history[0]
    const dir = path.dirname(filename)
    const nodes = []

    // Collect all the code block nodes
    visit(
      ast,
      (node) => node.type === "mdxJsxFlowElement" && node.name === "CodeBlock",
      (node) => {
        nodes.push(node)
        return SKIP
      },
    )

    const promises = nodes.map(async (node) => {
      const filename = getAttr(node, "filename")
      const meta = getAttr(node, "meta")
      if (!filename) return

      const raw = await fs.readFile(path.join(dir, filename), "utf8")

      // Add the code block as a child of the JSX element
      node.children = [
        {
          type: "code",
          lang: path.extname(filename).slice(1),
          value: raw.trim(),
          meta: `${filename} ${meta ?? ""}`,
        },
      ]
    })

    await Promise.all(promises)
  }
}
