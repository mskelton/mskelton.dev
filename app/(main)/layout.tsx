import { Footer } from '~/components/root/Footer'
import { Header } from '~/components/root/Header'

export interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header variant="main" />
      <main className="flex-1">{children}</main>
      <Footer variant="main" />
    </>
  )
}
