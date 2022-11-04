import { siteMeta } from "lib/siteMeta"

export default function Head() {
  return (
    <>
      <title>{`Mark Skelton - ${siteMeta.tagline}`}</title>
      <meta content={siteMeta.description} name="description" />
    </>
  )
}
