"use client"

import { Button } from "components/Button"
import ErrorPage from "components/ErrorPage"
import Link from "next/link"

export default function BytesError() {
  return (
    <ErrorPage
      action={
        <Button as={Link} href="/">
          Go back to homepage
        </Button>
      }
      code={500}
      subtitle={
        <>
          There was an error when loading the list of bytes. Sorry about that!
          You can try reloading the page, or if the error persists, feel free to
          drop me a line at{" "}
          <a href="mailto:info@mskelton.dev">info@mskelton.dev</a> and I’ll take
          a look.
        </>
      }
      title="Something Went Wrong"
    />
  )
}
