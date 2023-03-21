export type HeaderIconButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>

function HeaderIconButton(props: HeaderIconButtonProps) {
  return (
    <button
      className="rounded-full p-2 text-zinc-800 transition-colors hover:bg-blue-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
      type="button"
      {...props}
    />
  )
}

export default HeaderIconButton
