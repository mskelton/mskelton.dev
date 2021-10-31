import Image from "next/image"
import { ReactNode } from "react"
import { PageSEO } from "components/SEO"
import SocialIcon from "components/SocialIcon"
import { AuthorFrontMatter } from "types/FrontMatter"

interface AuthorLayoutProps {
  children?: ReactNode
  frontMatter: AuthorFrontMatter
}

export default function AuthorLayout({
  children,
  frontMatter: {
    avatar,
    company,
    email,
    github,
    linkedin,
    name,
    occupation,
    twitter,
  },
}: AuthorLayoutProps) {
  return (
    <>
      <PageSEO description={`About me - ${name}`} title={`About - ${name}`} />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              alt="avatar"
              className="w-48 h-48 rounded-full"
              height="192px"
              src={require(`../images/authors/${avatar}`)}
              width="192px"
            />

            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {name}
            </h3>

            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>

          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
