"use client"

import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid"
import Image, { ImageProps } from "next/image"
import React from "react"
import { MediumImage } from "react-medium-image"
import { isExternalImage } from "lib/image"

export interface ZoomableImageProps extends Omit<ImageProps, "src"> {
  src: string
}

export default function ZoomableImage({
  alt,
  src,
  ...props
}: ZoomableImageProps) {
  const Component = isExternalImage(src) ? "img" : Image

  return (
    <MediumImage
      // IconZoom={ArrowsPointingOutIcon}
      className="relative"
      // // eslint-disable-next-line react/jsx-no-useless-fragment
      // ZoomContent={({ img }) => <>{img}</>}
      expandButtonClassName=""
      expandButtonContainerClassName="absolute inset-0"
      wrapElement="span"
      // zoomMargin={48}
    >
      <Component
        alt={alt ?? ""}
        className="sm:-mx-8 sm:max-w-[calc(100%+4rem)]"
        placeholder="blur"
        src={src}
        {...props}
      />
    </MediumImage>
  )
}
