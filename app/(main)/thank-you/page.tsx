import { Metadata } from "next"
import { SimpleLayout } from "components/layouts/SimpleLayout"

export const metadata: Metadata = {
  description: `Thanks for subscribing to my newsletter.`,
  title: "You’re subscribed - Mark Skelton",
}

export default function ThankYou() {
  return (
    <SimpleLayout
      intro="I’ll send you an email any time I publish a new article, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
      title="Thanks for subscribing."
    />
  )
}
