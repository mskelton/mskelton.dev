import { Metadata } from "next"
import { Container } from "components/Container"
import { PageTitle } from "components/PageTitle"
import { Prose } from "components/Prose"
import Content from "./content.mdx"

export const metadata: Metadata = {
  description: `Results oriented front-end software engineer with a strong passion for delivering impactful and scalable solutions to customers, improving developer experience, and mentoring other developers to achieve success.`,
  title: "Resume | Mark Skelton",
}

export default function Projects() {
  return (
    <Container className="mx-auto mt-16 max-w-4xl sm:mt-20">
      <PageTitle>Hi, I’m Mark 👋</PageTitle>

      <Prose className="prose-h2:mt-3 prose-li:my-2">
        <Content />
      </Prose>
    </Container>
  )
}
