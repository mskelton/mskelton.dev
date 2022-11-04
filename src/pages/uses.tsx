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
  const description =
    "I create software 40+ hours per week so having the right tools is important to me. Poor tools can result in lower productivity and increased health risk. Here’s a big list of all of my favorite stuff."

  return (
    <>
      <Head>
        <title>Uses - Mark Skelton</title>
        <meta content={description} name="description" />
      </Head>

      <SimpleLayout
        intro={description}
        title="Software I use, gadgets I love, and other things I recommend."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="15” MacBook Pro, Intel Core i7, 16GB RAM (2016)">
              My first MacBook, much to the chagrin of my Dad at the time (who
              now also uses a MacBook). While I was disappointed to hear that my
              computer is not eligible for macOS Ventura due to it’s age, I
              don’t think I’ll replace it just yet as it still runs like a
              champ.
            </Tool>

            <Tool title="LG 4k Monitor (2x)">
              Multiple monitors is the only way to go. Thanks to my work getting
              rid of some old monitors, I now have the best of both worlds with
              a large main monitor <i>and</i> a secondary monitor.
            </Tool>

            <Tool
              href="https://www.zsa.io/moonlander"
              title="Moonlander Mark I Keyboard"
            >
              Ortholinear split keyboards are the way to go. While $350 looks
              like a lot on paper, it’s a small price for something that can
              save your wrist health and improve your productivity. After all,
              if you are using your keyboard for 8+ hours a day, shouldn’t it be
              good?
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
              I used to be a VS Code fanboy, but after using Vim motions for
              over a year, I switched to Neovim. Not the best tool for
              beginners, but if you are like me and enjoy spending hours
              tweaking and improving your Neovim configuration, it’s a great
              tool.
            </Tool>

            <Tool href="https://sw.kovidgoyal.net/kitty/" title="Kitty">
              A “blazingly fast” terminal emulator that works very well with my
              workflow. Easily configurable with code which makes it much
              superior to the default macOS terminal.
            </Tool>

            <Tool href="https://1password.com" title="1Password">
              By far the best password manager on the market. Totally worth the
              small price for the security and functionality it provides.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Productivity">
            <Tool href="https://www.raycast.com" title="Raycast">
              I used to use Alfred as a Spotlight replacement, but when Raycast
              came on the scene, it was a simple decision to switch. Highly
              extensible thanks to their extension API.
            </Tool>

            <Tool href="https://taskwarrior.org" title="Taskwarrior">
              Since I began my transition to Vim, I started to become a terminal
              junkie. Taskwarrior is an impressive CLI that let’s you manage
              your todo list entirely from the command line with tons of
              powerful features.
            </Tool>

            <Tool href="https://shottr.cc" title="Shottr">
              A better macOS screenshot tool. Not much more to be said, it’s
              just straight up awesome.
            </Tool>

            <Tool href="https://justgetflux.com" title="Flux">
              Not long into my career, I found that blue light was not great
              when starring at a computer for long periods of time. While there
              are built-in night modes on Mac, I find the customization of Flux
              hard to beat.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
