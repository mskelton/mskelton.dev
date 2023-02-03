import { siteMeta } from "lib/siteMeta"

export default function Head() {
  return (
    <>
      <title>About - Mark Skelton</title>
      <meta content={siteMeta.description} name="description" />
    </>
  )
}
