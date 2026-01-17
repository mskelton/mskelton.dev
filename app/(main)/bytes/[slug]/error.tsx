"use client"

import { Button } from "components/Button"
import ErrorPage from "components/ErrorPage"
import Link from "next/link"

export default function ByteError() {
  return (
    <ErrorPage
      action={
        <Button as={Link} href="/bytes">
          Go back to bytes
        </Button>
      }
      code={500}
      subtitle={
        <>
          There was an error when loading this byte. Sorry about that! You can
          try reloading the page, or if the error persists, feel free to drop me
          a line at <a href="mailto:info@mskelton.dev">info@mskelton.dev</a> and
          I’ll take a look.
        </>
      }
      title="Something Went Wrong"
    />
  )
}
