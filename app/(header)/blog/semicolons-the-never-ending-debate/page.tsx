import { articleMetadata } from "../utils/metadata"
import Content, { meta } from "./content.mdx"

export const metadata = articleMetadata(meta)

export default function Page() {
  return <Content />
}
