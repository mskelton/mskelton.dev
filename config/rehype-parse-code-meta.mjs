import rangeParser from "parse-numeric-range"
import { visit } from "unist-util-visit"

/**
 * Get the value given a regex. If the regex has a capture group, use the
 * captured value instead of the entire value. The matched value is removed from
 * the source string to allow for incremental parsing.
 */
function getValue(str, regex) {
  const match = regex.exec(str)
  const value = match?.[1] ?? match?.[0]

  return [value?.trim(), str.replace(regex, "")]
}

/**
 * Creates a builder for parsing meta objects. Parsing happens incrementally so
 * the order of items should be from most to least specific.
 */
const builder = (meta, result = {}) => ({
  add: (name, regex) => {
    const [value, rest] = getValue(meta, regex ?? new RegExp(name))
    return builder(rest, { ...result, [name]: value })
  },
  build: () => result,
})

export default function rehypeParseCodeMeta() {
  return (tree) => {
    visit(
      tree,
      (node) => node.type === "element" && node.tagName === "pre",
      (node) => {
        const code = Array.isArray(node.children)
          ? node.children[0]
          : node.children

        const meta = builder(code.data?.meta ?? "")
          .add("showLineNumbers")
          .add("highlight", /\{([0-9,-]+)\}/)
          .add("focus", /\[([0-9,-]+)\]/)
          .add("title", /.*/)
          .build()

        node.data ??= {}
        node.data.showLineNumbers = !!meta.showLineNumbers
        node.data.highlight = meta.highlight ? rangeParser(meta.highlight) : []
        node.data.focus = meta.focus ? rangeParser(meta.focus) : []
        node.data.title = meta.title
      },
    )
  }
}
