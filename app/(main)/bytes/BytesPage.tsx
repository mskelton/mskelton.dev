import { SimpleLayout } from "../../components/layouts/SimpleLayout"

export const description =
  "Bytes is my collection of short-form articles, tips, and things I learn as I build software."

export interface BytesPageProps {
  children: React.ReactNode
}

export default function BytesPage({ children }: BytesPageProps) {
  return (
    <SimpleLayout intro={description} title="Bits and bytes of code">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(360px,100%),1fr))] gap-12">
        {children}
      </div>
    </SimpleLayout>
  )
}
