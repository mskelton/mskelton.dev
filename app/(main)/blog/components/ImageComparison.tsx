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
  slug,
  src,
}: React.ImgHTMLAttributes<HTMLImageElement> & { slug?: string }) {
  return (
    <Image
      alt={alt ?? ""}
      onLoad={onLoad}
      placeholder="blur"
      src={require(`../../../images/blog/${slug}/${src}`)}
      style={styleFitContainer()}
    />
  )
}

export interface ImageComparisonProps {
  one: ReactCompareSliderImageProps
  slug?: string
  two: ReactCompareSliderImageProps
}

export function ImageComparison({ one, slug, two }: ImageComparisonProps) {
  const [loaded, setLoading] = useState(0)
  const imageProps = {
    onLoad: () => setLoading((count) => count + 1),
    slug,
  }
  console.log(one, slug)

  return (
    <ReactCompareSlider
      className="rounded-3xl sm:-mx-8 sm:max-w-[calc(100%+4rem)]"
      handle={
        <Handle
          buttonStyle={{ borderColor: "currentcolor" }}
          className={clsx(
            "text-indigo-400 opacity-0 transition",
            loaded === 2 && "opacity-100",
          )}
          style={{ color: undefined }}
        />
      }
      itemOne={<CompareImage {...one} {...imageProps} />}
      itemTwo={<CompareImage {...two} {...imageProps} />}
    />
  )
}
