import Skeleton from "../../components/Skeleton"
import BytesPage from "./BytesPage"

export default function Loading() {
  return (
    <BytesPage>
      {Array.from({ length: 1 }).map((_, i) => (
        <Skeleton key={i} className="h-[200px] rounded-2xl" />
      ))}
    </BytesPage>
  )
}
