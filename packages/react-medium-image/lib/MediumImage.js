// @ts-check
"use client"

import clsx from "clsx"
import React, { cloneElement, useEffect, useRef, useState } from "react"
import { ZoomIcon } from "./icons.js"

/**
 * @typedef {object} MediumImageProps
 * @property {import("react").ReactElement} children
 * @property {import("react").ReactElement | null} zoomIcon
 * @property {string | null} className
 * @property {number} margin
 * @property {string} zoomImageText
 */

/** @param {MediumImageProps} props */
export function MediumImage({
  children,
  className,
  margin = 24,
  zoomIcon,
  zoomImageText = "Zoom image",
}) {
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const ref = useRef(/** @type {HTMLImageElement | null} */ (null))
  const touchYStartRef = useRef(/** @type {number | undefined} */ (undefined))
  const touchYEndRef = useRef(/** @type {number | undefined} */ (undefined))

  const [isOpen, setIsOpen] = useState(false)
  const imgAlt = ref.current?.getAttribute("alt")

  useEffect(() => {
    if (!ref.current || !containerRef.current) return

    if (isOpen) {
      // Set the container size to the image size
      containerRef.current.style.height = `${ref.current.offsetHeight}px`
      containerRef.current.style.width = `${ref.current.offsetWidth}px`

      // Calculate the Y coordinate based on how far the image is from the top
      // of the viewport.
      const imageRect = ref.current.getBoundingClientRect()
      const translateY =
        (window.innerHeight - imageRect.height) / 2 - imageRect.top

      // Calculate the scale based on the smallest dimension of the image and
      // fill the viewport.
      const scale = Math.min(
        (window.innerWidth - margin) / imageRect.width,
        (window.innerHeight - margin) / imageRect.height,
      )

      ref.current.style.zIndex = "999"
      ref.current.style.position = "absolute"
      ref.current.style.transform = `translate(0px,${translateY}px) scale(${scale})`

      /** @param {KeyboardEvent} e */
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsOpen(false)
        } else {
          e.preventDefault()
        }
      }

      const handleClose = () => setIsOpen(false)

      /** @param {TouchEvent} e */
      const handleTouchStart = (e) => {
        if (e.changedTouches.length === 1 && e.changedTouches[0]) {
          touchYStartRef.current = e.changedTouches[0].screenY
        }
      }

      /** @param {TouchEvent} e */
      const handleTouchMove = (e) => {
        if (touchYStartRef.current != null && e.changedTouches[0]) {
          touchYEndRef.current = e.changedTouches[0].screenY

          const max = Math.max(touchYStartRef.current, touchYEndRef.current)
          const min = Math.min(touchYStartRef.current, touchYEndRef.current)
          const delta = Math.abs(max - min)
          const threshold = 10

          if (delta > threshold) {
            touchYStartRef.current = undefined
            touchYEndRef.current = undefined
            handleClose()
          }
        }
      }

      const handleTouchCancel = () => {
        touchYStartRef.current = undefined
        touchYEndRef.current = undefined
      }

      document.addEventListener("keydown", handleKeyDown)
      window.addEventListener("wheel", handleClose, { passive: true })
      window.addEventListener("touchstart", handleTouchStart)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchcancel", handleTouchCancel)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        // @ts-expect-error passive isn't a valid prop
        window.removeEventListener("wheel", handleClose, { passive: true })
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("touchcancel", handleTouchCancel)
      }
    } else {
      containerRef.current.style.height = ""
      containerRef.current.style.width = ""

      ref.current.style.position = ""
      ref.current.style.transform = ""
      ref.current.style.zIndex = ""
    }
  }, [isOpen, margin])

  return (
    <span
      ref={containerRef}
      className={clsx("rmi", isOpen ? "open" : "closed", className)}
    >
      <button
        aria-label={imgAlt ? `${zoomImageText}: ${imgAlt}` : zoomImageText}
        className="rmi-zoom-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {zoomIcon ?? <ZoomIcon />}
      </button>

      <span className="rmi-overlay" />
      {cloneElement(children, {
        className: clsx("rmi-image", children.props.className),
        onClick: () => setIsOpen(!isOpen),
        ref,
      })}
    </span>
  )
}
