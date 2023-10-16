import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import { cloneElement } from "react"
import { skills } from "./Skills.meta"

export default function Skills() {
  return (
    <div className="not-prose grid grid-cols-[repeat(auto-fill,minmax(148px,1fr))] gap-3 text-sm">
      {skills.map(({ icon, name, url }) => {
        return (
          <a
            key={name}
            className="focusable group relative flex aspect-video flex-col items-center justify-center gap-2 rounded-md border border-zinc-200/50 bg-zinc-100/50 text-white outline-none transition-all hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {cloneElement(icon, {
              className: icon.props?.className ?? "h-6 w-6",
            })}
            {name}
            <ArrowTopRightOnSquareIcon className="absolute right-2 top-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100" />
          </a>
        )
      })}
    </div>
  )
}
