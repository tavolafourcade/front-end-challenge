import { create } from 'zustand'

type CategoryState = {
  selectedCategoryId: number | null
  setSelectedCategoryId: (id: number | null) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}))
