import avatar from "images/portrait.jpg"
import { Metadata } from "next"
import Image from "next/image"
import { Fragment } from "react"
import { Container } from "~/components/Container"
import { PageTitle } from "~/components/PageTitle"
import { Prose } from "~/components/Prose"
import Date from "./Date"
import { roles } from "./roles"
import Skills from "./Skills"

export const metadata: Metadata = {
  description: `Results oriented front-end software engineer with a strong passion for delivering impactful and scalable solutions to customers, improving developer experience, and mentoring other developers to achieve success.`,
  title: "Resume | Mark Skelton",
}

export default function Projects() {
  const work = (
    <>
      <h2>Education</h2>
      <p>
        <span className="block">B.A. Computer Science</span>
        <span className="block">Thomas Edison State University</span>
      </p>
    </>
  )

  return (
    <Container className="mx-auto mt-16 max-w-6xl md:mt-20">
      <div className="grid-cols-[auto_1fr] gap-x-8 lg:grid">
        <Image
          alt="Mark Skelton"
          className="row-span-2 hidden aspect-square size-32 rounded-md bg-zinc-100 object-cover lg:block dark:bg-zinc-800"
          priority
          src={avatar}
        />

        <PageTitle className="mb-6 lg:mb-0">Hi, I’m Mark 👋</PageTitle>
        <p className="text-zinc-700 lg:text-balance dark:text-zinc-300">
          Experienced software engineer with over seven years of experience
          building scalable web apps. Dedicated team leader and mentor
          passionate about teaching, developer experience, and high-quality UX.
        </p>
      </div>

      <Prose className="prose-h2:mt-8 prose-li:my-2 grid gap-x-20 lg:grid-cols-[1fr_280px]">
        <div className="m-0 text-center lg:col-start-2">
          <h2>Skills</h2>
          <Skills />

          <div className="m-0 hidden text-center lg:block">{work}</div>
        </div>

        <div className="m-0 lg:row-start-1">
          {roles
            .filter((role) => role.responsibilities.length)
            .map((role, i) => (
              <Fragment key={i}>
                <h2>
                  {role.title} at <a href={role.href}>{role.company}</a>
                </h2>
                <Date>{role.date}</Date>
                <ul>
                  {role.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </Fragment>
            ))}
        </div>

        <div className="m-0 text-center lg:hidden">{work}</div>
      </Prose>
    </Container>
  )
}
