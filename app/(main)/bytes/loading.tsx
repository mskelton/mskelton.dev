import { SimpleLayout } from '~/components/layouts/SimpleLayout'
import Loader from '~/components/Loader'
import { metadata } from './page'

export default function BytesLoading() {
  return (
    <SimpleLayout
      intro={metadata.description}
      noMargin
      title="Bits and bytes of code"
    >
      <Loader className="mt-24 flex flex-col items-center" />
    </SimpleLayout>
  )
}
