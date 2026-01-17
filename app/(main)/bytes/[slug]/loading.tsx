import { PostLayout } from "~/components/layouts/PostLayout"
import Loader from "~/components/Loader"

export default function ByteLoading() {
  return (
    <PostLayout backHref="/bytes" backText="Go back to bytes">
      <Loader className="mt-24 flex flex-col items-center" />
    </PostLayout>
  )
}
