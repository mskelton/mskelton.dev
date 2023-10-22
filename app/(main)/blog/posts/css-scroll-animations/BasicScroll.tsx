export default function Component() {
  return (
    <div className="relative h-[320px] overflow-y-scroll">
      <div className="h-[1200px]">
        <div className="sticky left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)] aspect-square w-[--size] animate-[spin_1ms_linear] rounded-lg bg-blue-400 [--size:120px] [animation-timeline:scroll()]" />
      </div>
    </div>
  )
}
