import { siteMeta } from "lib/siteMeta.js"

export default function Head() {
  return (
    <>
      <title>About - Mark Skelton</title>
      <meta content={siteMeta.description} name="description" />
    </>
  )
}
