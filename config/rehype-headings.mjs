import rehypeAutolinkHeadings from "rehype-autolink-headings"

/** @type {import("unified").Pluggable} */
const rehypeHeadings = [
  rehypeAutolinkHeadings,
  {
    content: {
      children: [],
      properties: {
        className: [
          "relative",
          "md:before:content-['#']",
          "before:absolute",
          "before:right-2",
        ],
      },
      tagName: "span",
      type: "element",
    },
    properties: {
      ariaHidden: true,
      className: [
        "heading-link",
        "text-indigo-500",
        "transition-colors",
        "hover:text-indigo-400",
        "dark:text-indigo-400",
        "dark:hover:text-indigo-500",
      ],
      tabIndex: -1,
    },
  },
]

export default rehypeHeadings
