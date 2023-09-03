"use client"

import Link from "next/link"
import { Button } from "../../../components/Button"
import ErrorPage from "../../../components/ErrorPage"

export default function ByteError() {
  return (
    <ErrorPage
      action={
        <Button as={Link} href="/bytes">
          Go back to bytes
        </Button>
      }
      code={404}
      subtitle="Seems you are trying to access a byte which doesn't exist. Try verifying that the URL is correct, or navigate back to the bytes list to find what you are looking for."
      title="A byte went missing"
    />
  )
}
