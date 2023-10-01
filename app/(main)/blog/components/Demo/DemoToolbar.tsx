import { ViewfinderCircleIcon } from "@heroicons/react/24/outline"
import { GitHubIcon } from "components/SocialIcons"
import { TooltipGroup } from "components/Tooltip"
import CopyCodeButton from "./CopyCodeButton"
import DemoToolbarButton from "./DemoToolbarButton"
import ExpandCodeButton from "./ExpandCodeButton"
import ResetDemoButton from "./ResetDemoButton"

const gh = (path: string) =>
  `https://github.com/mskelton/mskelton.dev/blob/main/app/(main)/blog/posts/${path}`

export interface DemoToolbarProps {
  isExpanded: boolean
  onFocusReset: () => void
  onReset: () => void
  onToggleExpanded: () => void
  path: string
  raw: string
}

export default function DemoToolbar({
  isExpanded,
  onFocusReset,
  onReset,
  onToggleExpanded,
  path,
  raw,
}: DemoToolbarProps) {
  return (
    <div className="not-prose w-full rounded-b-xl border-t border-zinc-200 transition-colors dark:border-zinc-700/80">
      <div className="flex items-center justify-end gap-3 px-4 py-2">
        <TooltipGroup>
          <ExpandCodeButton
            isExpanded={isExpanded}
            onToggleExpanded={onToggleExpanded}
          />

          <CopyCodeButton raw={raw} />

          <DemoToolbarButton href={gh(path)} title="View source on GitHub">
            <GitHubIcon />
          </DemoToolbarButton>

          <DemoToolbarButton
            onClick={onFocusReset}
            title="Reset focus to test keyboard navigation"
          >
            <ViewfinderCircleIcon />
          </DemoToolbarButton>

          <ResetDemoButton onReset={onReset} />
        </TooltipGroup>
      </div>
    </div>
  )
}
