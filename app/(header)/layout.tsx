import { Avatar } from "../components/Avatar"
import { AvatarContainer } from "../components/AvatarContainer"
import { Header } from "../components/root/Header"

export interface HeaderLayoutProps {
  children?: React.ReactNode
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <>
      <Header
        avatar={
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
        }
      />

      <main>{children}</main>
    </>
  )
}
