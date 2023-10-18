// @ts-check
import rehypeCallout from "@mskelton/rehype-callout"
import { error, info, warn } from "./icons.mjs"

/**
 * @type {[
 *   import("unified").Pluggable,
 *   import("@mskelton/rehype-callout").Options,
 * ]}
 */
const config = [
  rehypeCallout,
  {
    icons: {
      INFO: info,
      WARN: warn,
      ERROR: error,
    },
    class: {
      default: [
        "px-4 -mx-4 relative dark:text-white transition-colors",
        "sm:rounded sm:-mr-6 sm:-ml-7 py-4 sm:px-6 sm:border-l-4",
      ],
      INFO: "bg-indigo-300/50 border-indigo-500 dark:bg-indigo-900/50 dark:border-indigo-500",
      WARN: "bg-yellow-300/50 border-yellow-500 dark:bg-yellow-900/50 dark:border-yellow-500",
      ERROR:
        "bg-red-300/50 border-red-500 dark:bg-red-900/50 dark:border-red-500",
    },
    iconClass: {
      default: "s-9 absolute top-1 right-1 p-1.5 transition-colors",
      INFO: "text-indigo-600 dark:text-indigo-400",
      WARN: "text-yellow-700 dark:text-yellow-500",
      ERROR: "text-red-600 dark:text-red-500",
    },
    titleClass:
      "text-zinc-900 dark:text-white font-bold mb-2 block transition-colors",
    contentClass: "text-zinc-700 dark:text-zinc-200 transition-colors",
  },
]

export default config
