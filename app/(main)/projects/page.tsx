import { Metadata } from "next"
import Image from "next/image"
import { Card } from "../../components/Card"
import { SimpleLayout } from "../../components/layouts/SimpleLayout"
import { projects } from "./projects"

export const metadata: Metadata = {
  description: `I love creating software, especially when it makes the process of creating software more enjoyable. These are some of my more popular projects that I’m proud of.`,
  title: "Projects - Mark Skelton",
}

export default function Projects() {
  return (
    <SimpleLayout
      intro={metadata.description}
      title="Things I’ve done to make software development just a little bit easier."
    >
      <ul
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {projects.map((project) => (
          <Card key={project.name} as="li">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                alt=""
                aria-hidden="true"
                className="h-8 w-8"
                src={project.logo}
                unoptimized
              />
            </div>

            <h2 className="mt-6 text-base font-semibold">
              <Card.Link
                className="text-zinc-800 transition-colors dark:text-zinc-100"
                href={project.href}
                prefetch={false}
              >
                {project.name}
              </Card.Link>
            </h2>

            <Card.Description className="mb-6">
              {project.description}
            </Card.Description>

            <Card.ExternalLink href={project.href} />
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
