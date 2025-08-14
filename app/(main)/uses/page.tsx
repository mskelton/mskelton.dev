import { Metadata } from "next"
import { Card } from "components/Card"
import { SimpleLayout } from "components/layouts/SimpleLayout"
import { Section, SectionProps } from "components/Section"

export const metadata: Metadata = {
  description: `I create software 40+ hours per week so having the right tools is important to me. Poor tools can result in lower productivity and increased health risk. Here’s a big list of all of my favorite stuff.`,
  title: "Uses | Mark Skelton",
}

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
      <Card.Title as="h3" href={href} prefetch={false}>
        {title}
      </Card.Title>

      <Card.Description className={href ? "mb-6" : ""}>
        {children}
      </Card.Description>

      {href ? <Card.ExternalLink href={href} /> : null}
    </Card>
  )
}

export default function Uses() {
  return (
    <SimpleLayout
      intro={metadata.description}
      title="Software I use, gadgets I love, and other things I recommend."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool
            href="https://www.apple.com/shop/buy-mac/macbook-pro/16-inch"
            title="16” MacBook Pro, M1, 16GB RAM (2021)"
          >
            After several years of nursing along an old MacBook, I gave in an
            bought a new MacBook Pro. This machine is an absolute workhorse and
            I’ve yet to see the fans kick in. Oh yeah, and if you are
            considering an upgrade, the 16” is totally worth the extra money.
          </Tool>

          <Tool
            href="https://www.lg.com/us/monitors/lg-32up83a-w-4k-uhd-led-monitor#"
            title="LG 4k Monitor (2x)"
          >
            Multiple monitors is the only way to go. Thanks to my work getting
            rid of some old monitors, I now have the best of both worlds with a
            large main monitor <i>and</i> a secondary monitor.
          </Tool>

          <Tool
            href="https://kinesis-ergo.com/shop/adv360pro"
            title="Kinesis Advantage 360 Pro Keyboard"
          >
            Ortholinear split keyboards are the way to go. While $450 looks like
            a lot on paper, it’s a small price for something that can save your
            wrist health and improve your productivity. After all, if you are
            using your keyboard for 8+ hours a day, shouldn’t it be good?
          </Tool>

          <Tool
            href="https://www.logitech.com/en-us/products/mice/mx-master-3s.html"
            title="Logitech MX Master 3S Mouse"
          >
            Not being a gamer, having a fancy mouse seemed like something I
            wouldn’t do, but I decied to try it to improve ergonimics and
            efficency, and now there is no turning back. This mouse has by far
            the greatest scroll wheel I’ve ever used.
          </Tool>

          <Tool
            href="https://www.autonomous.ai/standing-desks/smartdesk-2-home"
            title="Autonomous SmartDesk Core"
          >
            I love my standing desk. So much easier to work when I can alternate
            between sitting and standing, and Autonomous is really high quality
            for the price.
          </Tool>

          <Tool
            href="https://www.autonomous.ai/office-chairs/ergonomic-chair"
            title="Autonomous ErgoChair Pro"
          >
            While certainly as fancy as a Herman Miller chair, this chair get’s
            the job done and is much better than the kitchen chair I used for
            three years.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Development tools">
          <Tool href="https://www.cursor.com" title="Cursor">
            As much as I love Neovim, I switched back to the VS Code ecosystem
            to take advantage of Cursor’s AI features. Has made a massive
            improvement in my productivity.
          </Tool>

          <Tool
            href="https://www.anthropic.com/claude-code"
            title="Claude Code"
          >
            Alongside Cursor, I use Claude Code for a lot of my longer AI
            sessions. Really great for developing scripts, projects, and
            features when giving a good spec.
          </Tool>

          <Tool href="https://1password.com" title="1Password">
            By far the best password manager on the market. Totally worth the
            small price for the security and functionality it provides.
          </Tool>

          <Tool href="https://www.raycast.com" title="Raycast">
            For years the best Spotlight replacement. Apple took a swing at them
            with a bunch of Spotlight improvements, but Raycast is still
            unmatched.
          </Tool>

          <Tool href="https://todoist.com" title="Todoist">
            My life runs on Todoist, quite literally. Without it, I would forget
            to clean the house or take out the trash. Let software remember
            stuff so you don’t have to.
          </Tool>

          <Tool href="https://shottr.cc" title="Shottr">
            A better macOS screenshot tool. Not much more to be said, it’s just
            straight up awesome.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
