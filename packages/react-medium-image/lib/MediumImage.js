// @ts-check
import clsx from "clsx"
import React, { cloneElement, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ZoomIcon } from "./icons.js"
import { getImgAlt, getImgSrc } from "./utils.js"

/** @type {HTMLDivElement} */
let portal
if (typeof document !== "undefined") {
  portal = document.createElement("div")
  portal.className = "data-rmi-portal"
  document.body.appendChild(portal)
}

/**
 * @typedef {object} MediumImageProps
 * @property {import("react").ReactElement} children
 * @property {import("react").ElementType} wrapElement
 * @property {import("react").ReactElement | null} zoomIcon
 * @property {string | null} className
 * @property {string} zoomImageText
 */

/** @param {MediumImageProps} props */
export function MediumImage({
  children,
  className,
  wrapElement: WrapElement = "div",
  zoomIcon,
  zoomImageText = "Zoom image",
}) {
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const contentRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const imgRef = useRef(/** @type {HTMLImageElement | null} */ (null))
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null))
  const dialogContentRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const id = useId()
  const dialogId = `rmi-dialog-${id}`
  const imageId = `rmi-img-${id}`

  const imgAlt = getImgAlt(imgRef.current)
  const imgSrc = getImgSrc(imgRef.current)
  const imgSizes = imgRef.current?.sizes
  const imgSrcSet = imgRef.current?.srcset

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal?.()
    } else {
      dialogRef.current?.close?.()
    }
  }, [isOpen])

  return (
    <WrapElement
      ref={containerRef}
      aria-owns={dialogId}
      className={clsx(className, "rmi")}
    >
      <button
        aria-label={imgAlt ? `${zoomImageText}: ${imgAlt}` : zoomImageText}
        className="rmi-zoom-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {zoomIcon ?? <ZoomIcon />}
      </button>

      <WrapElement
        ref={contentRef}
        style={{ visibility: isOpen ? "hidden" : "visible" }}
      >
        {cloneElement(children, {
          onClick: () => setIsOpen(true),
          onLoad: () => setIsImageLoaded(true),
          ref: imgRef,
        })}
      </WrapElement>

      {isImageLoaded &&
        portal != null &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby={imageId}
            aria-modal="true"
            className="rmi-dialog"
            id={dialogId}
            // onClick={handleDialogClick}
            onCancel={() => setIsOpen(false)}
            onClose={() => setIsOpen(false)}
            role="dialog"
          >
            <div className="rmi-dialog-overlay" />

            <div ref={dialogContentRef} className="rmi-dialog-content">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                // ref={refModalImg}
                alt={imgAlt}
                className="rmi-dialog-img"
                id={imageId}
                sizes={imgSizes}
                src={imgSrc}
                srcSet={imgSrcSet}
                // style={this.styleModalImg}
                // width={this.styleModalImg.width || undefined}
                // {...(isZoomImgLoaded && modalState === ModalState.LOADED
                //   ? zoomImg
                //   : {})}
                // height={this.styleModalImg.height || undefined}
              />
            </div>
          </dialog>,
          portal,
        )}
    </WrapElement>
  )
}
