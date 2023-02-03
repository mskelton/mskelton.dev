const identifier = (name) => ({ name, type: "Identifier" })

function importDecl() {
  return {
    importKind: "value",
    source: {
      type: "Literal",
      value: "components/ArticleLayout",
    },
    specifiers: [
      {
        imported: identifier("ArticleLayout"),
        local: identifier("ArticleLayout"),
        type: "ImportSpecifier",
      },
    ],
    type: "ImportDeclaration",
  }
}

function exportDecl() {
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
          name: { name: "ArticleLayout", type: "JSXIdentifier" },
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
  return (ast) => {
    if (ast.children[0].type === "mdxjsEsm" && ast.children[0].value === "") {
      return
    }

    ast.children.unshift({
      data: {
        estree: {
          body: [importDecl(), exportDecl()],
          sourceType: "module",
          type: "Program",
        },
      },
      type: "mdxjsEsm",
      value: "",
    })
  }
}
