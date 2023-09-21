import { ToolLayout } from "components/layouts/ToolLayout"
import JqEditor from "./JqEditor"
import { JqInit } from "./lib/JqInit"

export const metadata = {
  description: "jq web playground",
  title: "jq | Mark Skelton",
}

export default function Page() {
  return (
    <ToolLayout title="jq">
      <JqInit />
      <JqEditor />
    </ToolLayout>
  )
}
