import { SKIP, visit } from "unist-util-visit"

function calculateLines(range) {
  let hasHighlights = false

  return {
    highlighted: () => hasHighlights,
    test: (index) => {
      // There are newlines between each line, so we need to divide by 2
      // to get the actual line number.
      const match = range?.includes(index / 2 + 1)
      hasHighlights = hasHighlights || match
      return match
    },
  }
}

export default function rehypeCodeMeta() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        const highlight = calculateLines(node.data?.highlight)
        const focus = calculateLines(node.data?.focus)

        if (node.data?.showLineNumbers) {
          node.properties.class += " line-numbers"
        }

        // Move the tabIndex property to the code element
        delete node.properties.tabindex

        visit(
          node,
          (t) => t.type === "element" && t.tagName === "code",
          (code) => {
            code.properties.tabIndex = 0
          },
        )

        visit(
          node,
          (t) => t.type === "element" && t.properties?.class?.includes("line"),
          (line, index, parent) => {
            if (!line.children.length && index !== parent.children.length - 1) {
              // Add a zero-width space to allow highlighting over empty lines
              line.children.push({ type: "text", value: "\u200b" })
            }

            if (highlight.test(index)) {
              line.properties.class += " highlight"

              // Add a prop that indicates that this code block has focused
              // so we can display an expand/collapse button.
              node.properties.hasHighlight = true
            }

            if (focus.test(index)) {
              line.properties.class += " focus"

              // Add a prop that indicates that this code block has focused
              // so we can display an expand/collapse button.
              node.properties.hasFocus = true
            }
          },
        )

        if (highlight.highlighted()) {
          node.properties.class += " highlight"
        }

        if (focus.highlighted()) {
          node.properties.class += " focus"
        }

        return SKIP
      },
    )
  }
}
