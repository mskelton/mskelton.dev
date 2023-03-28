import { getMetadata } from "../meta"
import Content, { meta } from "./content.mdx"

export const metadata = getMetadata(meta)

export default function Page() {
  return <Content />
}
