import { toText } from "hast-util-to-text"
import { SKIP, visit } from "unist-util-visit"

export default function rehypeShiki({ highlighter }) {
  return (ast) => {
    visit(
      ast,
      (node) => {
        return (
          node.tagName === "pre" &&
          Array.isArray(node.children) &&
          node.children.length === 1 &&
          node.children[0].tagName === "code" &&
          typeof node.children[0].properties === "object" &&
          node.children[0].properties !== null &&
          Array.isArray(node.children[0].properties.className) &&
          typeof node.children[0].properties.className[0] === "string" &&
          node.children[0].properties.className[0].startsWith("language-")
        )
      },
      (node, index, parent) => {
        const code = toText(node).slice(0, -1)
        const language = node.children[0].properties.className[0]
          .split("language-")
          .at(-1)

        let output = []
        try {
          output = highlighter.codeToThemedTokens(code, language)
        } catch (error) {
          return
        }

        parent.children[index] = {
          children: [
            {
              children: output.map((line) => ({
                children: line.map((token) => ({
                  children: [
                    {
                      type: "text",
                      value: token.content,
                    },
                  ],
                  properties: {
                    style: `color: ${token.color};`,
                  },
                  tagName: "span",
                  type: "element",
                })),
                properties: {
                  className: ["line"],
                },
                tagName: "span",
                type: "element",
              })),
              tagName: "code",
              type: "element",
            },
          ],
          properties: {
            className: ["shiki"],
            style: `background-color: ${highlighter.getBackgroundColor()};`,
            tabindex: 0,
          },
          tagName: "pre",
          type: "element",
        }

        return SKIP
      },
    )
  }
}
