import path from "node:path"
import { visit } from "unist-util-visit"

/**
 * Automatically add the directory path to images.
 */
export default function remarkAutoImagePath() {
  const visitor = (dir) => (node) => {
    node.url = path.join(dir, node.url)
  }

  return (ast, vfile) => {
    const dir = path.basename(path.dirname(vfile.history[0]))
    visit(ast, "image", visitor(dir))
  }
}
