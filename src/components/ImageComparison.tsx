import Image from "next/image"
import React from "react"
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderHandleProps,
  ReactCompareSliderImageProps,
  styleFitContainer,
} from "react-compare-slider"

const Handle = ReactCompareSliderHandle as React.FC<
  ReactCompareSliderHandleProps & { className: string }
>

function CompareImage({ alt, src }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      alt={alt ?? ""}
      placeholder="blur"
      src={require(`../images/${src}`)}
      style={styleFitContainer()}
    />
  )
}

export function ImageComparison({ one, two }: ImageComparisonProps) {
  return (
    <ReactCompareSlider
      handle={
        <Handle
          buttonStyle={{ borderColor: "currentcolor" }}
          className="animate-[delay-appear_200ms_linear_200ms_forwards]	text-teal-500 opacity-0 transition"
          style={{ color: undefined }}
        />
      }
      itemOne={<CompareImage {...one} />}
      itemTwo={<CompareImage {...two} />}
    />
  )
}

export interface ImageComparisonProps {
  one: ReactCompareSliderImageProps
  two: ReactCompareSliderImageProps
}
