import type { NormalizedBBox } from '../../../stores/annotationStore'

export function pxToNormalized(
  x: number,
  y: number,
  w: number,
  h: number,
  naturalWidth: number,
  naturalHeight: number,
): NormalizedBBox {
  return {
    x: x / naturalWidth,
    y: y / naturalHeight,
    w: w / naturalWidth,
    h: h / naturalHeight,
  }
}

export function normalizedToPx(bbox: NormalizedBBox, naturalWidth: number, naturalHeight: number) {
  return {
    x: Math.round(bbox.x * naturalWidth),
    y: Math.round(bbox.y * naturalHeight),
    w: Math.round(bbox.w * naturalWidth),
    h: Math.round(bbox.h * naturalHeight),
  }
}

