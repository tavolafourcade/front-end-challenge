import { useEffect, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getCategories, getUnanalyzedImages, postAnnotations } from '../../../lib/api/endpoints'
import type { AnnotationPayload } from '../../../lib/api/endpoints'
import { useCategoryStore } from '../../../stores/categoryStore'
import { useAnnotationStore } from '../../../stores/annotationStore'
import { useImageQueueStore } from '../../../stores/imageQueueStore'
import { normalizedToPx } from '../utils/bbox'
import { toast } from 'sonner'

import ImageCanvas from '../components/ImageCanvas'
import ImageCanvasSkeleton from '../components/ImageCanvasSkeleton'
import Sidebar from '../../categories/containers/SidebarContainer'

export default function ImageAnalyzerContainer() {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ['images'],
    queryFn: getUnanalyzedImages,
  })
  const { data, isLoading } = useQuery({ queryKey: ['categories'], queryFn: getCategories })

  const activeImageId = useImageQueueStore((s) => s.activeImageId)
  const setActiveImageId = useImageQueueStore((s) => s.setActiveImageId)
  const setBBox = useAnnotationStore((s) => s.setBBox)
  const bbox = useAnnotationStore((s) => s.bbox)

  const selectedId = useCategoryStore((s) => s.selectedCategoryId)
  const setSelectedId = useCategoryStore((s) => s.setSelectedCategoryId)

  useEffect(() => {
    if (selectedId == null && data?.length) setSelectedId(data[0].id)
  }, [data, selectedId, setSelectedId])

  const activeImage = images?.find((img) => img.id === activeImageId)

  const completeMutation = useMutation({
    mutationFn: postAnnotations,
    onSuccess: () => {
      toast.success('Annotation completed successfully')
      moveToNextImage()
    },
    onError: () => {
      toast.error('Failed to complete annotation')
    },
  })

  const discardMutation = useMutation({
    mutationFn: postAnnotations,
    onSuccess: () => {
      toast.success('Annotation discarded successfully')
      moveToNextImage()
    },
    onError: () => {
      toast.error('Failed to discard annotation')
    },
  })

  const moveToNextImage = () => {
    if (!images || !activeImageId) return
    const currentIndex = images.findIndex((img) => img.id === activeImageId)
    const nextImage =
      currentIndex >= 0 && currentIndex + 1 < images.length ? images[currentIndex + 1] : images[0]
    if (nextImage) {
      setActiveImageId(nextImage.id)
    }
  }

  const handleComplete = () => {
    if (!activeImage || !selectedId || !bbox) return

    const imgElement = imgRef.current
    if (!imgElement || !imgElement.naturalWidth || !imgElement.naturalHeight) return

    const bboxPx = normalizedToPx(bbox, imgElement.naturalWidth, imgElement.naturalHeight)

    const payload: AnnotationPayload = {
      imageId: activeImage.id,
      annotations: [
        {
          categoryId: selectedId,
          boundingBoxes: [
            {
              topLeftX: bboxPx.x,
              topLeftY: bboxPx.y,
              width: bboxPx.w,
              height: bboxPx.h,
            },
          ],
        },
      ],
    }

    completeMutation.mutate(payload)
  }

  const handleDiscard = () => {
    if (!activeImage) return

    const payload: AnnotationPayload = {
      imageId: activeImage.id,
      annotations: [],
    }

    discardMutation.mutate(payload)
  }

  useEffect(() => {
    setBBox(null)
  }, [activeImageId, setBBox])

  return (
    <div className="flex w-full h-[600px] mx-auto box-border">
      {imagesLoading || !activeImage ? (
        <ImageCanvasSkeleton />
      ) : (
        <ImageCanvas imageUrl={activeImage.url} imgRef={imgRef} />
      )}
      <Sidebar
        categories={data ?? []}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDiscard={handleDiscard}
        onConfirm={handleComplete}
        confirmDisabled={selectedId == null || bbox == null}
        isLoading={isLoading}
        discardLoading={discardMutation.isPending}
        confirmLoading={completeMutation.isPending}
      />
    </div>
  )
}
