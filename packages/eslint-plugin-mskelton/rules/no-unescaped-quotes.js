// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isJSX } = require("../utils/jsx")

const entities = [
  { alternatives: ["“", "”"], char: '"' },
  { alternatives: ["’", "‘"], char: "'" },
]

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @param {import("eslint").Rule.Node} node
 */
function reportUnescaped(context, node) {
  if (!node.loc) return

  // HTML entities are already escaped in node.value (as well as node.raw),
  // so pull the raw text from context.sourceCode
  for (let i = node.loc.start.line; i <= node.loc.end.line; i++) {
    let rawLine = context.sourceCode.lines[i - 1]
    const start = i === node.loc.start.line ? node.loc.start.column : 0
    const end = i === node.loc.end.line ? node.loc.end.column : rawLine.length

    rawLine = rawLine.slice(start, end)

    for (const entity of entities) {
      for (let index = 0; index < rawLine.length; index++) {
        if (rawLine[index] === entity.char) {
          context.report({
            data: { entity: entity.char },
            loc: { column: start + index, line: i },
            messageId: "unescapedEntity",
            node,
            suggest: entity.alternatives.map((alt) => ({
              data: {
                alt,
                entity: entity.char,
              },
              fix: (fixer) => {
                const rangeStart = context.sourceCode.getIndexFromLoc({
                  column: start + index,
                  line: i,
                })

                return fixer.replaceTextRange([rangeStart, rangeStart + 1], alt)
              },
              messageId: "unescapedEntitySuggestion",
            })),
          })
        }
      }
    }
  }
}

/** @type {import("eslint").Rule.RuleModule} */
const rule = {
  create(context) {
    return {
      /** @param {import("eslint").Rule.Node} node */
      "Literal, JSXText"(node) {
        if (isJSX(node.parent)) {
          reportUnescaped(context, node)
        }
      },
    }
  },
  meta: {
    fixable: "code",
    hasSuggestions: true,
    messages: {
      unescapedEntity: "HTML entity, {{entity}}, must be escaped.",
      unescapedEntitySuggestion: "Replace {{entity}} with {{alt}}.",
    },
    schema: [],
    type: "suggestion",
  },
}

module.exports = rule
