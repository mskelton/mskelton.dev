import { pascalCase } from "change-case"
import fs from "node:fs/promises"
import path from "node:path"
import { SKIP, visit } from "unist-util-visit"

export default function remarkDemo() {
  return async (ast, vfile) => {
    const filename = vfile.history[0]
    const dir = path.dirname(filename)
    const nodes = []
    const imports = []

    // Collect all the demo nodes
    visit(
      ast,
      (node) => node.type === "mdxJsxFlowElement" && node.name === "Demo",
      (node) => {
        nodes.push(node)
        return SKIP
      },
    )

    const promises = nodes.map(async (node) => {
      const slug = node.attributes.find((attr) => attr.name === "slug")?.value
      if (!slug) return

      const componentName = pascalCase(slug)

      // Read the file and add the source
      const source = await fs.readFile(path.join(dir, `${slug}.tsx`), "utf8")

      // Add the source code as a child so that rehype-shiki can parse it
      node.children.push({
        type: "code",
        lang: "tsx",
        value: source,
      })

      // Add the import to the list of imports
      imports.push({
        name: componentName,
        source: `./${slug}`,
      })

      // Add the component as an attribute. Using children makes more sense, but
      // that complicates the parsing of the source code.
      node.attributes.push({
        name: "source",
        type: "mdxJsxAttribute",
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
                        name: componentName,
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

    // Automatically add the imports to the start of the file
    ast.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: imports.map((node) => ({
            type: "ImportDeclaration",
            source: {
              type: "Literal",
              value: node.source,
            },
            specifiers: [
              {
                type: "ImportDefaultSpecifier",
                local: {
                  type: "Identifier",
                  name: node.name,
                },
              },
            ],
          })),
        },
      },
    })
  }
}
