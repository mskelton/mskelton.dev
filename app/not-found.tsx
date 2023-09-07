"use client"

import Link from "next/link"
import MainLayout from "(main)/layout"
import { Button } from "components/Button"
import ErrorPage from "components/ErrorPage"

export default function RootNotFound() {
  return (
    <MainLayout>
      <ErrorPage
        action={
          <Button as={Link} href="/">
            Go back to homepage
          </Button>
        }
        code={404}
        subtitle="Looks like you are trying to access a page that doesn't exist. Try verifying the URL is correct or head on back to the homepage to find what you are looking for."
        title="Page Not Found"
      />
    </MainLayout>
  )
}
