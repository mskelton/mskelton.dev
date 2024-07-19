import { OverlayArrow as BaseOverlayArrow } from "react-aria-components"
import { tv } from "tailwind-variants"

const styles = tv({
  base: "fill-gray-900 dark:fill-white h-4",
  variants: {
    placement: {
      bottom: "rotate-180",
      center: "",
      left: "-rotate-90",
      right: "rotate-90",
      top: "",
    },
  },
})

export function OverlayArrow() {
  return (
    <BaseOverlayArrow>
      {({ placement }) => (
        <svg className={styles({ placement })} viewBox="0 0 12 12">
          <path
            d="M0,0 L4,4 S6,6 8,4 L12 0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </BaseOverlayArrow>
  )
}
