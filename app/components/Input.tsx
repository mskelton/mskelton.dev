import { twMerge } from 'tailwind-merge'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={twMerge(
        'rounded-lg px-4 py-2 font-medium ring-1 outline-hidden transition focus:ring-3',
        'placeholder:text-sm placeholder:font-normal placeholder:text-zinc-500 placeholder:italic',
        'bg-zinc-100 text-zinc-900 ring-zinc-200 focus:ring-indigo-500/50',
        'dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700 dark:focus:ring-indigo-500/50',
        className,
      )}
      {...props}
    />
  )
}
