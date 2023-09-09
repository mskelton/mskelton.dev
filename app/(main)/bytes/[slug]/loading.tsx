import { ArticleLayout } from "components/layouts/ArticleLayout"
import Loader from "components/Loader"

export default function ByteLoading() {
  return (
    <ArticleLayout backHref="/bytes" backText="Go back to bytes">
      <Loader className="mt-24 flex flex-col items-center" />
    </ArticleLayout>
  )
}
