import path, { relative } from "node:path"

const identifier = (name) => ({ name, type: "Identifier" })

function importDecl(name, path) {
  return {
    importKind: "value",
    source: {
      type: "Literal",
      value: path,
    },
    specifiers: [
      {
        imported: identifier(name),
        local: identifier(name),
        type: "ImportSpecifier",
      },
    ],
    type: "ImportDeclaration",
  }
}

function exportDecl(name) {
  return {
    declaration: {
      body: {
        children: [],
        openingElement: {
          attributes: [
            {
              name: { name: "meta", type: "JSXIdentifier" },
              type: "JSXAttribute",
              value: {
                expression: identifier("meta"),
                type: "JSXExpressionContainer",
              },
            },
            { argument: identifier("props"), type: "JSXSpreadAttribute" },
          ],
          name: { name, type: "JSXIdentifier" },
          selfClosing: true,
          type: "JSXOpeningElement",
        },
        type: "JSXElement",
      },
      expression: true,
      params: [identifier("props")],
      type: "ArrowFunctionExpression",
    },
    type: "ExportDefaultDeclaration",
  }
}

export default function remarkLayout() {
  return (ast, vfile) => {
    const layout = vfile.data.matter.layout ?? "ArticleLayout"
    const relativePath = path.relative(
      path.dirname(vfile.history[0]),
      path.join(process.cwd(), "app/components/layouts")
    )

    if (layout !== "none") {
      ast.children.unshift({
        data: {
          estree: {
            body: [
              importDecl(layout, `${relativePath}/${layout}`),
              exportDecl(layout),
            ],
            sourceType: "module",
            type: "Program",
          },
        },
        type: "mdxjsEsm",
        value: "",
      })
    }
  }
}
