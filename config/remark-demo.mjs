import fs from "node:fs/promises"
import path from "node:path"
import { SKIP, visit } from "unist-util-visit"

export default function remarkDemo() {
  return async (ast, vfile) => {
    const filename = vfile.history[0]
    const dir = path.dirname(filename)
    const nodes = []

    // Collect all the demo nodes
    visit(
      ast,
      (node) =>
        node.type === "mdxJsxFlowElement" &&
        node.name === "Demo" &&
        node.children?.[0]?.name,
      (node) => {
        nodes.push(node)
        return SKIP
      },
    )

    const promises = nodes.map(async (node) => {
      const name = node.children?.[0]?.name
      const raw = await fs.readFile(path.join(dir, `${name}.tsx`), "utf8")

      // Replace the child nodes with the source code
      node.children = [
        {
          type: "code",
          lang: "tsx",
          meta: { demo: true },
          value: raw,
        },
      ]

      // Add the raw source for copying
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "raw",
        value: raw.trim(),
      })

      // Add the component name as an attribute so we can display the GitHub path
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "name",
        value: `${path.basename(dir)}/${name}.tsx`,
      })

      // Add the component as an attribute. Using children makes more sense, but
      // that complicates the parsing of the source code.
      node.attributes.push({
        type: "mdxJsxAttribute",
        name: "component",
        value: {
          data: {
            type: "mdxJsxAttributeValueExpression",
            estree: {
              type: "Program",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "JSXElement",
                    openingElement: {
                      type: "JSXOpeningElement",
                      selfClosing: true,
                      attributes: [],
                      name: {
                        name,
                        type: "JSXIdentifier",
                      },
                    },
                    children: [],
                  },
                },
              ],
            },
          },
        },
      })
    })

    await Promise.all(promises)
  }
}
