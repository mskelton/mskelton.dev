import { visit } from "unist-util-visit"

/**
 * Combine the code block language and meta into a single string so it is passed
 * through as the class name. That way we can parse it via the rehype plugin.
 */
export default function remarkCodeMeta() {
  const visitor = (node) => {
    if (node.lang && node.meta) {
      // Sanitize the meta into a string without spaces to properly pass through
      // as a class.
      const meta = node.meta
        ?.split(",")
        .map((str) => str.trim())
        .join()
        .split(" ")
        .join(":")

      node.lang = `${node.lang}:${meta}`
    }
  }

  return (ast) => visit(ast, "code", visitor)
}
