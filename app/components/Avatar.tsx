import clsx from "clsx"
import Image from "next/image"
import Link, { LinkProps } from "next/link"
import avatarImage from "../images/avatar.jpg"

export interface AvatarProps extends Omit<LinkProps<string>, "href"> {
  className?: string
  large?: boolean
}

export function Avatar({ className, large = false, ...props }: AvatarProps) {
  return (
    <Link
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      href="/"
      {...props}
    >
      <Image
        alt=""
        className={clsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-24 w-24" : "h-11 w-11"
        )}
        priority
        sizes={large ? "6rem" : "2.25rem"}
        src={avatarImage}
      />
    </Link>
  )
}
