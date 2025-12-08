import { EnvelopeIcon } from "@heroicons/react/24/solid"
import { Button } from "../Button"

export function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 transition-colors dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 transition-colors dark:text-zinc-100">
        <EnvelopeIcon className="size-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>

      <p className="mt-2 text-sm text-zinc-700 transition-colors dark:text-zinc-300">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>

      <div className="mt-6 flex">
        <input
          aria-label="Email address"
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 transition-colors placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-hidden focus:ring-4 focus:ring-indigo-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/15 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10"
          placeholder="Email address"
          required
          type="email"
        />

        <Button className="ml-4 flex-none" type="submit">
          Join
        </Button>
      </div>
    </form>
  )
}
