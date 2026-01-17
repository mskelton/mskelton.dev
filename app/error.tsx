"use client"

import Link from "next/link"
import MainLayout from "~/(main)/layout"
import { Button } from "~/components/Button"
import ErrorPage from "~/components/ErrorPage"

export default function RootError() {
  return (
    <MainLayout>
      <ErrorPage
        action={
          <Button as={Link} href="/">
            Go back to homepage
          </Button>
        }
        code={500}
        subtitle={
          <>
            There was an error when loading this page. Sorry about that! You can
            try reloading the page, or if the error persists, feel free to drop
            me a line at{" "}
            <a href="mailto:info@mskelton.dev">info@mskelton.dev</a> and I’ll
            take a look.
          </>
        }
        title="Something Went Wrong"
      />
    </MainLayout>
  )
}
