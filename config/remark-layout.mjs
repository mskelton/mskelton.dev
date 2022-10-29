const identifier = (name) => ({ type: "Identifier", name })

function importDecl() {
  return {
    source: {
      type: "Literal",
      value: "components/ArticleLayout",
    },
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportSpecifier",
        imported: identifier("ArticleLayout"),
        local: identifier("ArticleLayout"),
      },
    ],
    importKind: "value",
  }
}

function exportDecl() {
  return {
    type: "ExportDefaultDeclaration",
    declaration: {
      type: "ArrowFunctionExpression",
      expression: true,
      params: [identifier("props")],
      body: {
        type: "JSXElement",
        openingElement: {
          type: "JSXOpeningElement",
          name: { type: "JSXIdentifier", name: "ArticleLayout" },
          attributes: [
            {
              type: "JSXAttribute",
              name: { type: "JSXIdentifier", name: "meta" },
              value: {
                type: "JSXExpressionContainer",
                expression: identifier("meta"),
              },
            },
            { type: "JSXSpreadAttribute", argument: identifier("props") },
          ],
          selfClosing: true,
        },
        children: [],
      },
    },
  }
}

export default function remarkLayout() {
  return (ast) => {
    ast.children.unshift({
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [importDecl(), exportDecl()],
        },
      },
    })
  }
}
