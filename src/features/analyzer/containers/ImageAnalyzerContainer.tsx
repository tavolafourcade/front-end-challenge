import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getUnanalyzedImages } from '../../../lib/api/endpoints'
import { useCategoryStore } from '../../../stores/categoryStore'
import { useAnnotationStore } from '../../../stores/annotationStore'
import { useImageQueueStore } from '../../../stores/imageQueueStore'

import ImageCanvas from '../components/ImageCanvas'
import ImageCanvasSkeleton from '../components/ImageCanvasSkeleton'
import Sidebar from '../../categories/containers/SidebarContainer'

export default function ImageAnalyzerContainer() {
  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ['images'],
    queryFn: getUnanalyzedImages,
  })
  const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  const activeImageId = useImageQueueStore((s) => s.activeImageId)
  const setBBox = useAnnotationStore((s) => s.setBBox)

  const selectedId = useCategoryStore((s) => s.selectedCategoryId)
  const setSelectedId = useCategoryStore((s) => s.setSelectedCategoryId)

  useEffect(() => {
    if (selectedId == null && data?.length) setSelectedId(data[0].id)
  }, [data, selectedId, setSelectedId])

  const activeImage = images?.find((img) => img.id === activeImageId)

  useEffect(() => {
    setBBox(null)
  }, [activeImageId, setBBox])

  return (
    <div className="flex w-full h-[600px] mx-auto box-border">
      {imagesLoading || !activeImage ? (
        <ImageCanvasSkeleton />
      ) : (
        <ImageCanvas imageUrl={activeImage.url} />
      )}
      <Sidebar
        categories={data ?? []}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDiscard={() => {}}
        onConfirm={() => {}}
        confirmDisabled={selectedId == null}
        isLoading={isLoading}
      />
    </div>
  )
}
