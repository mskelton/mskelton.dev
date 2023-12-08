import { Metadata } from "next"
import Image from "next/image"
import { Fragment } from "react"
import { Container } from "components/Container"
import { PageTitle } from "components/PageTitle"
import { Prose } from "components/Prose"
import avatar from "images/avatar.jpg"
import Date from "./Date"
import { roles } from "./roles"
import Skills from "./Skills"

export const metadata: Metadata = {
  description: `Results oriented front-end software engineer with a strong passion for delivering impactful and scalable solutions to customers, improving developer experience, and mentoring other developers to achieve success.`,
  title: "Resume | Mark Skelton",
}

export default function Projects() {
  return (
    <Container className="mx-auto mt-16 max-w-6xl sm:mt-20">
      <div className="grid grid-cols-[auto,1fr] gap-x-8">
        <Image
          alt="Mark Skelton"
          className="row-span-2 aspect-square rounded-md bg-zinc-100 object-cover dark:bg-zinc-800 sm:h-32 sm:w-32"
          priority
          src={avatar}
        />

        <PageTitle>Hi, I’m Mark 👋</PageTitle>
        <p className="text-gray-300 [text-wrap:balance]">
          Experienced software engineer with over seven years of experience
          building scalable web apps. Dedicated team leader and mentor
          passionate about teaching, developer experience, and high-quality UX.
        </p>
      </div>

      <Prose className="flex gap-20 prose-h2:mt-8 prose-li:my-2">
        <div>
          {roles.map((role) => (
            <Fragment key={role.title}>
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

        <div className="min-w-[280px] text-center">
          <h2>Skills</h2>
          <Skills />

          <h2>Education</h2>
          <p>
            <span className="block">B.A. Computer Science</span>
            <span className="block">Thomas Edison State University</span>
          </p>
        </div>
      </Prose>
    </Container>
  )
}
