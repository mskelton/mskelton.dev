import { visit } from "unist-util-visit"

/**
 * Combine the code block language and meta into a single string so it is passed
 * through as the class name. That way we can parse it via the rehype plugin.
 */
export default function remarkCodeTitles() {
  const visitor = (node) => {
    if (node.lang && node.meta) {
      node.lang = `${node.lang}:${node.meta}`
    }
  }

  return (ast) => visit(ast, "code", visitor)
}
