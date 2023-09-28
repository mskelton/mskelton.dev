export interface DateProps {
  children: React.ReactNode
}

export default function Date({ children }: DateProps) {
  return <p className="-mt-3 text-sm text-zinc-500">{children}</p>
}
