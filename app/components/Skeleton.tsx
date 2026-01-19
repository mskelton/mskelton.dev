import { twMerge } from 'tailwind-merge'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        'h-full w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800/50',
        className,
      )}
      {...props}
    />
  )
}
