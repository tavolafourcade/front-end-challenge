import { create } from 'zustand'

type ImageQueueState = {
  activeImageId: number | null
  setActiveImageId: (id: number | null) => void
}

export const useImageQueueStore = create<ImageQueueState>((set) => ({
  activeImageId: null,
  setActiveImageId: (id) => set({ activeImageId: id }),
}))
