import { Footer } from "../components/root/Footer"
import { Header } from "../components/root/Header"

export interface HeaderLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: HeaderLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}