import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAnnotationStore } from '../../../stores/annotationStore'
import { normalizedToPx, pxToNormalized } from '../utils/bbox'

type Props = { imageUrl: string }

export default function ImageCanvas({ imageUrl }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [overlayRect, setOverlayRect] = useState<{
    x: number
    y: number
    w: number
    h: number
  } | null>(null)
  const bbox = useAnnotationStore((s) => s.bbox)
  const setBBox = useAnnotationStore((s) => s.setBBox)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)

  const updateOverlayRect = useCallback(() => {
    const img = imgRef.current
    const container = containerRef.current
    if (!img || !container) return
    const ir = img.getBoundingClientRect()
    const cr = container.getBoundingClientRect()
    setOverlayRect({ x: ir.left - cr.left, y: ir.top - cr.top, w: ir.width, h: ir.height })
  }, [])

  useEffect(() => {
    updateOverlayRect()
    const onResize = () => updateOverlayRect()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [imageUrl, updateOverlayRect])

  const bboxPx = useMemo(() => {
    if (!bbox || !overlayRect) return null
    return normalizedToPx(bbox, overlayRect.w, overlayRect.h)
  }, [bbox, overlayRect])

  const clientToImageCoords = useCallback(
    (clientX: number, clientY: number) => {
      const rect = overlayRect
      const container = containerRef.current
      if (!rect || !container) return { x: 0, y: 0 }
      const cr = container.getBoundingClientRect()
      const x = Math.max(0, Math.min(rect.w, clientX - cr.left - rect.x))
      const y = Math.max(0, Math.min(rect.h, clientY - cr.top - rect.y))
      return { x, y }
    },
    [overlayRect],
  )

  const onPointerDown = useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (e) => {
      if (!overlayRect) return
      const { x, y } = clientToImageCoords(e.clientX, e.clientY)
      setDragStart({ x, y })
    },
    [clientToImageCoords, overlayRect],
  )

  const onPointerMove = useCallback<React.PointerEventHandler<HTMLDivElement>>(
    (e) => {
      if (!dragStart || !overlayRect) return
      const { x, y } = clientToImageCoords(e.clientX, e.clientY)
      const left = Math.min(dragStart.x, x)
      const top = Math.min(dragStart.y, y)
      const w = Math.max(1, Math.abs(x - dragStart.x))
      const h = Math.max(1, Math.abs(y - dragStart.y))
      setBBox(pxToNormalized(left, top, w, h, overlayRect.w, overlayRect.h))
    },
    [clientToImageCoords, dragStart, overlayRect, setBBox],
  )

  const onPointerUp = useCallback<React.PointerEventHandler<HTMLDivElement>>(() => {
    setDragStart(null)
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-black flex justify-center items-center overflow-hidden relative"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Image to annotate"
        className="max-w-full max-h-full object-contain select-none"
        draggable={false}
        onLoad={updateOverlayRect}
      />
      {overlayRect && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: overlayRect.y,
            left: overlayRect.x,
            width: overlayRect.w,
            height: overlayRect.h,
          }}
        >
          {bboxPx && (
            <div
              className="absolute border-2 border-red-600 bg-red-300/20"
              style={{ width: bboxPx.w, height: bboxPx.h, top: bboxPx.y, left: bboxPx.x }}
            />
          )}
        </div>
      )}
    </div>
  )
}
