import Image from "next/image"
import Link from "./Link"

interface CardProps {
  description: string
  href?: string
  imgSrc: string
  title: string
}

export default function Card({ description, href, imgSrc, title }: CardProps) {
  const image = (
    <Image
      alt={title}
      className="object-cover object-center lg:h-48 md:h-36"
      height={306}
      src={imgSrc}
      width={544}
    />
  )

  return (
    <div className="p-4 md:w-1/2 md" style={{ maxWidth: "544px" }}>
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700">
        {href ? (
          <Link aria-label={`Link to ${title}`} href={href}>
            image
          </Link>
        ) : (
          image
        )}

        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link aria-label={`Link to ${title}`} href={href}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>

          <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">
            {description}
          </p>

          {href && (
            <Link
              aria-label={`Link to ${title}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              href={href}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
