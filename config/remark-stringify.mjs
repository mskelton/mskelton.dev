function getText(node) {
  switch (node.type) {
    case "link":
      return collectText(node)

    default:
      return node.value
  }
}

function collectText(ast) {
  return ast.children.map(getText).join("").replaceAll("\n", " ")
}

export default function remarkStringify() {
  const compiler = (ast) => {
    return collectText(ast.children[0])
  }

  Object.assign(this, { Compiler: compiler })
}
