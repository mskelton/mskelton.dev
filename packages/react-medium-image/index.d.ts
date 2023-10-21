import React from "react"

export interface MediumImageProps {
  children: React.ReactElement
  className?: string
  margin?: number
  zoomIcon?: React.ReactElement
  zoomImageText?: string
}

export declare function MediumImage(props: MediumImageProps): JSX.Element
