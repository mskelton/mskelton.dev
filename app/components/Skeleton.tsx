import { twMerge } from "tailwind-merge"

export interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full animate-pulse bg-zinc-100 dark:bg-zinc-800/50",
        className,
      )}
    />
  )
}
