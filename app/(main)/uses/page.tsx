import { Metadata } from "next"
import { Card } from "../../components/Card"
import { SimpleLayout } from "../../components/layouts/SimpleLayout"
import { Section, SectionProps } from "../../components/Section"

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
          <Tool href="https://neovim.io" title="Neovim">
            I used to be a VS Code fanboy, but after using Vim motions for over
            a year, I switched to Neovim. Not the best tool for beginners, but
            if you are like me and enjoy spending hours tweaking and improving
            your Neovim configuration, it’s a great tool.
          </Tool>

          <Tool href="https://sw.kovidgoyal.net/kitty/" title="Kitty">
            A “blazingly fast” terminal emulator that works very well with my
            workflow. Easily configurable with code which makes it much superior
            to the default macOS terminal.
          </Tool>

          <Tool href="https://github.com/tmux/tmux" title="Tmux">
            Not long into my career, I found that blue light was not great when
            starring at a computer for long periods of time. While there are
            built-in night modes on Mac, I find the customization of Flux hard
            to beat.
          </Tool>
        </ToolsSection>

        <ToolsSection title="Productivity">
          <Tool href="https://1password.com" title="1Password">
            By far the best password manager on the market. Totally worth the
            small price for the security and functionality it provides.
          </Tool>

          <Tool href="https://www.raycast.com" title="Raycast">
            I used to use Alfred as a Spotlight replacement, but when Raycast
            came on the scene, it was a simple decision to switch. Highly
            extensible thanks to their extension API.
          </Tool>

          <Tool href="https://taskwarrior.org" title="Taskwarrior">
            Since I began my transition to Vim, I started to become a terminal
            junkie. Taskwarrior is an impressive CLI that let’s you manage your
            todo list entirely from the command line with tons of powerful
            features.
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
