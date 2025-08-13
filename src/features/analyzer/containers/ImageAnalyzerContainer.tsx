import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../../lib/api/endpoints'
import { useCategoryStore } from '../../../stores/categoryStore'

import ImageCanvas from '../components/ImageCanvas'
import Sidebar from '../../categories/containers/SidebarContainer'

export default function ImageAnalyzerContainer() {
  const imageUrl = 'https://dummyimage.com/280/c4c4c4/ffffff&text=frame'
  const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  const selectedId = useCategoryStore((s) => s.selectedCategoryId)
  const setSelectedId = useCategoryStore((s) => s.setSelectedCategoryId)

  useEffect(() => {
    if (selectedId == null && data?.length) setSelectedId(data[0].id)
  }, [data, selectedId, setSelectedId])

  return (
    <div className="flex w-full h-[600px] mx-auto box-border">
      <ImageCanvas imageUrl={imageUrl} />
      <Sidebar
        categories={isLoading ? [] : (data ?? [])}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDiscard={() => {}}
        onConfirm={() => {}}
        confirmDisabled={selectedId == null}
      />
    </div>
  )
}
