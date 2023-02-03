import { siteMeta } from "lib/siteMeta"

export default function Head() {
  return (
    <>
      <title>{`Mark Skelton - ${siteMeta.tagline}`}</title>
      <meta content={siteMeta.description} name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
