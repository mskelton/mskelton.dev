import { SimpleLayout } from "components/layouts/SimpleLayout"
import JqEditor from "./JqEditor"

export const metadata = {
  description: "jq is a lightweight and flexible command-line JSON processor.",
  title: "jq | Mark Skelton",
}

export default function Page() {
  return (
    <SimpleLayout intro={metadata.description} title="jq">
      <JqEditor />
    </SimpleLayout>
  )
}
