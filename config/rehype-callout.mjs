// @ts-check
import rehypeCallout from "@mskelton/rehype-callout"
import { error, info, warn } from "./icons.mjs"

/**
 * @type {[
 *   import("unified").Plugin,
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
        "p-4 relative text-sm dark:text-white rounded-lg overflow-hidden",
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1",
      ],
      INFO: "bg-indigo-300/50 before:bg-indigo-500 dark:bg-indigo-900/50 dark:before:bg-indigo-500",
      WARN: "bg-yellow-300/50 before:bg-yellow-500 dark:bg-yellow-900/50 dark:before:bg-yellow-500",
      ERROR:
        "bg-red-300/50 border-red-500 dark:bg-red-900/50 dark:border-red-500",
    },
    iconClass: {
      default: "size-8 absolute top-1 right-1 p-1.5",
      INFO: "text-indigo-600 dark:text-indigo-400",
      WARN: "text-yellow-700 dark:text-yellow-500",
      ERROR: "text-red-600 dark:text-red-500",
    },
    titleClass: "text-zinc-900 text-base dark:text-white font-bold mb-2 block",
    contentClass: "text-zinc-700 dark:text-zinc-200",
  },
]

export default config
