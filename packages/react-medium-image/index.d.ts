import React from "react"

export interface MediumImageProps {
  children: React.ReactElement
  className?: string
  wrapElement?: React.ElementType
  zoomIcon?: React.ReactElement
  zoomImageText?: string
}

export declare function MediumImage(props: MediumImageProps): JSX.Element
