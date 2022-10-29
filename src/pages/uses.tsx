import Head from "next/head"
import { Card } from "components/Card"
import { Section, SectionProps } from "components/Section"
import { SimpleLayout } from "components/SimpleLayout"

function ToolsSection({ children, ...props }: SectionProps) {
  return (
    <Section {...props}>
      <ul className="space-y-16" role="list">
        {children}
      </ul>
    </Section>
  )
}

export interface ToolProps {
  children?: React.ReactNode
  href?: string
  title: React.ReactNode
}

function Tool({ children, href, title }: ToolProps) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  const description = `Software I use, gadgets I love, and other things I recommend.`

  return (
    <>
      <Head>
        <title>Uses - Mark Skelton</title>
        <meta content={description} name="description" />
      </Head>
      <SimpleLayout
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
        title={description}
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="15” MacBook Pro, Intel Core i7, 16GB RAM (2016)">
              My first MacBook, much to the chagrin of my Dad at the time (who
              now also uses a MacBook). While I was dissapointed to hear that my
              computer is not eligable for macOS Ventura due to it’s age, I
              don’t think I’ll replace it just yet as it still runs like a
              champ.
            </Tool>

            <Tool title="LG Ultra Fine ">
              The only display on the market if you want something HiDPI and
              bigger than 27”. When you’re working at planetary scale, every
              pixel you can get counts.
            </Tool>

            <Tool
              href="https://www.zsa.io/moonlander"
              title="Moonlander Mark 1 Keyboard"
            >
              Ortholinear split keyboars are the way to go. While $350 looks
              like a lot on paper, it’s a small price for something that can
              save your wrist health and improve your productivity. After all,
              if you are using your keyboard for 8+ hours a day, shouldn’t it be
              good?
            </Tool>

            <Tool
              href="https://www.logitech.com/en-us/products/mice/mx-master-3s.html"
              title="Logitech MX Master 3s Mouse"
            >
              Something about all the gestures makes me feel like a wizard with
              special powers. I really like feeling like a wizard with special
              powers.
            </Tool>

            <Tool
              href="https://www.autonomous.ai/standing-desks/smartdesk-2-home"
              title="Autonomous SmartDesk Core"
            >
              I love my standing desk. So much easier to work when I can
              alternate between sitting and standing, and Autonomous is really
              high quality for the price.
            </Tool>

            <Tool
              href="https://www.autonomous.ai/office-chairs/ergonomic-chair"
              title="Autonomous ErgoChair Pro"
            >
              While certainly as fancy as a Herman Miller chair, this chair
              get’s the job done and is much better than the kitchen chair I
              used for three years.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Development tools">
            <Tool href="https://neovim.io" title="Neovim">
              I don’t care if it’s missing all of the fancy IDE features
              everyone else relies on, Sublime Text is still the best text
              editor ever made.
            </Tool>
            <Tool href="https://sw.kovidgoyal.net/kitty/" title="Kitty">
              I’m honestly not even sure what features I get with this that
              aren’t just part of the macOS Terminal but it’s what I use.
            </Tool>
            <Tool title="TablePlus">
              Great software for working with databases. Has saved me from
              building about a thousand admin interfaces for my various projects
              over the years.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Productivity">
            <Tool href="https://www.raycast.com" title="Raycast">
              It’s not the newest kid on the block but it’s still the fastest.
              The Sublime Text of the application launcher world.
            </Tool>
            <Tool title="Reflect">
              Using a daily notes system instead of trying to keep things
              organized by topics has been super powerful for me. And with
              Reflect, it’s still easy for me to keep all of that stuff
              discoverable by topic even though all of my writing happens in the
              daily note.
            </Tool>
            <Tool title="SavvyCal">
              Great tool for scheduling meetings while protecting my calendar
              and making sure I still have lots of time for deep work during the
              week.
            </Tool>
            <Tool title="Focus">
              Simple tool for blocking distracting websites when I need to just
              do the work and get some momentum going.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
