import Head from "next/head"
import { Card } from "components/Card"
import { Section, SectionProps } from "components/Section"
import { SimpleLayout } from "components/SimpleLayout"

function SpeakingSection({ children, ...props }: SectionProps) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

export interface AppearanceProps {
  cta: React.ReactNode
  description: React.ReactNode
  event: React.ReactNode
  href: string
  title: React.ReactNode
}

function Appearance({ cta, description, event, href, title }: AppearanceProps) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export default function Speaking() {
  return (
    <>
      <Head>
        <title>Speaking - Mark Skelton</title>
        <meta
          content="I’ve spoken at events all around the world and been interviewed for many podcasts."
          name="description"
        />
      </Head>

      <SimpleLayout
        intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
      >
        <div className="space-y-20">
          <SpeakingSection title="Conferences">
            <Appearance
              cta="Watch video"
              description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
              event="SysConf 2021"
              href="#"
              title="In space, no one can watch you stream — until now"
            />

            <Appearance
              cta="Watch video"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="Business of Startups 2020"
              href="#"
              title="Lessons learned from our first product recall"
            />
          </SpeakingSection>

          <SpeakingSection title="Podcasts">
            <Appearance
              cta="Listen to podcast"
              description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
              event="Encoding Design, July 2022"
              href="#"
              title="Using design as a competitive advantage"
            />

            <Appearance
              cta="Listen to podcast"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="The Escape Velocity Show, March 2022"
              href="#"
              title="Bootstrapping an aerospace company to $17M ARR"
            />

            <Appearance
              cta="Listen to podcast"
              description="On the importance of creating systems and processes for running your business so that everyone on the team knows how to make the right decision no matter the situation."
              event="How They Work Radio, September 2021"
              href="#"
              title="Programming your company operating system"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}
