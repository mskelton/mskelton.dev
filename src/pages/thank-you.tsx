import Head from "next/head"
import { SimpleLayout } from "components/SimpleLayout"

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>You’re subscribed - Mark Skelton</title>
        <meta
          content="Thanks for subscribing to my newsletter."
          name="description"
        />
      </Head>

      <SimpleLayout
        intro="I’ll send you an email any time I publish a new article, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
        title="Thanks for subscribing."
      />
    </>
  )
}
