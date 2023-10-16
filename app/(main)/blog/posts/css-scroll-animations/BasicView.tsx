import { LoremIpsum } from "lorem-ipsum"

const lorem = new LoremIpsum()

export default function Component() {
  return (
    <div className="relative h-[320px] overflow-y-scroll [timeline-scope:_--tl]">
      <div className="absolute h-20 [view-timeline:_--tl]" />

      <div className="sticky top-0 mb-4 w-full animate-[header_1ms_linear_forwards] rounded-t-lg px-4 py-3 text-xl font-bold [animation-range:exit] [animation-timeline:_--tl]">
        Lorem AI
      </div>

      <div className="flex flex-col gap-3 p-4 pt-0">
        <p>{lorem.generateSentences(8)}</p>
        <p>{lorem.generateSentences(8)}</p>
      </div>
    </div>
  )
}
