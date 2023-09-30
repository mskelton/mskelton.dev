import {
  ArrowPathIcon,
  ChevronUpDownIcon,
  ClipboardDocumentIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline"
import { GitHubIcon } from "components/SocialIcons"
import DemoToolbarButton from "./DemoToolbarButton"

const gh = (path: string) =>
  `https://github.com/mskelton/mskelton.dev/blob/main/app/(main)/blog/posts/${path}`

async function copy(text: string) {
  await navigator.clipboard.writeText(text)
}

export interface DemoToolbarProps {
  onFocusReset: () => void
  onReset: () => void
  onToggleExpanded: () => void
  path: string
  raw: string
}

export default function DemoToolbar({
  onFocusReset,
  onReset,
  onToggleExpanded,
  path,
  raw,
}: DemoToolbarProps) {
  return (
    <div className="not-prose w-full rounded-b-xl border-t border-zinc-200 transition-colors dark:border-zinc-700/80">
      <div className="flex items-center justify-end gap-3 px-4 py-2">
        <DemoToolbarButton onClick={onToggleExpanded} title="Expand code">
          <ChevronUpDownIcon />
        </DemoToolbarButton>

        <DemoToolbarButton onClick={() => copy(raw)} title="Copy the source">
          <ClipboardDocumentIcon />
        </DemoToolbarButton>

        <DemoToolbarButton href={gh(path)} title="View source on GitHub">
          <GitHubIcon />
        </DemoToolbarButton>

        <DemoToolbarButton
          onClick={onFocusReset}
          title="Reset focus to test keyboard navigation"
        >
          <ViewfinderCircleIcon />
        </DemoToolbarButton>

        <DemoToolbarButton onClick={onReset} title="Reset demo">
          <ArrowPathIcon />
        </DemoToolbarButton>
      </div>
    </div>
  )
}
