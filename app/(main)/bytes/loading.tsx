import Input from "components/Input"
import { SimpleLayout } from "components/layouts/SimpleLayout"
import Loader from "components/Loader"
import { metadata } from "./page"

export default function BytesLoading() {
  return (
    <SimpleLayout
      intro={metadata.description}
      noMargin
      title="Bits and bytes of code"
    >
      <div className="w-96 max-w-full">
        <form role="search">
          <Input
            aria-label="Search bytes"
            className="mt-6 w-full"
            disabled
            name="q"
            placeholder="Search for bytes..."
          />
        </form>
      </div>

      <Loader className="mt-24 flex flex-col items-center" />
    </SimpleLayout>
  )
}
