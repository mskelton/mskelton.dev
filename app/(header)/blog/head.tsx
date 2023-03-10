import { description } from "./meta"

export default function Head() {
  return (
    <>
      <title>Blog - Mark Skelton</title>
      <meta content={description} name="description" />
    </>
  )
}
