"use client"

import clsx from "clsx"
import Image from "next/image"
import React, { useState } from "react"
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

function CompareImage({
  alt,
  onLoad,
  src,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      alt={alt ?? ""}
      onLoad={onLoad}
      placeholder="blur"
      src={require(`../../../images/blog/${src}`)}
      style={styleFitContainer()}
    />
  )
}

export function ImageComparison({ one, two }: ImageComparisonProps) {
  const [loaded, setLoading] = useState(0)
  const handleLoad = () => setLoading((count) => count + 1)

  return (
    <ReactCompareSlider
      className="rounded-3xl"
      handle={
        <Handle
          buttonStyle={{ borderColor: "currentcolor" }}
          className={clsx(
            "text-indigo-400 opacity-0 transition",
            loaded === 2 && "opacity-100"
          )}
          style={{ color: undefined }}
        />
      }
      itemOne={<CompareImage {...one} onLoad={handleLoad} />}
      itemTwo={<CompareImage {...two} onLoad={handleLoad} />}
    />
  )
}

export interface ImageComparisonProps {
  one: ReactCompareSliderImageProps
  two: ReactCompareSliderImageProps
}
