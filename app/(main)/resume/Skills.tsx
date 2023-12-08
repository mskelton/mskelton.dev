import { cloneElement } from "react"
import { skills } from "./Skills.meta"

export default function Skills() {
  return (
    <div className="not-prose grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-3">
      {skills
        .filter(({ disabled }) => !disabled)
        .map(({ icon, name, url }) => (
          <a
            key={name}
            className="group relative flex flex-col items-center gap-2 rounded-md p-1 text-white outline-none transition-all focusable"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="rounded-md border border-zinc-200/50 bg-zinc-100/50 p-2 text-white outline-none transition-all group-hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:group-hover:bg-zinc-800">
              {cloneElement(icon, {
                className: icon.props?.className ?? "s-5",
              })}
            </span>

            <span className="text-xs">{name}</span>
          </a>
        ))}
    </div>
  )
}
