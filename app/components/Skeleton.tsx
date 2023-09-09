import { twMerge } from "tailwind-merge"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50 rounded-lg",
        className,
      )}
      {...props}
    />
  )
}
