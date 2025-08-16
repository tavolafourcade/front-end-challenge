import { create } from 'zustand'

export type NormalizedBBox = { x: number; y: number; w: number; h: number }

type AnnotationState = {
  bbox: NormalizedBBox | null
  setBBox: (bbox: NormalizedBBox | null) => void
}

export const useAnnotationStore = create<AnnotationState>((set) => ({
  bbox: null,
  setBBox: (bbox) => set({ bbox }),
}))
