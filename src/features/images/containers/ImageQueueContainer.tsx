import { useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getUnanalyzedImages } from '../../../lib/api/endpoints'
import ImageQueue from '../components/ImageQueue'
import { useImageQueueStore } from '../../../stores/imageQueueStore'

export default function ImageQueueContainer() {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ['images'], queryFn: getUnanalyzedImages })
  const items = useMemo(() => (data ?? []).map((d) => ({ id: d.id, url: d.url })), [data])
  const activeImageId = useImageQueueStore((s) => s.activeImageId)
  const setActiveImageId = useImageQueueStore((s) => s.setActiveImageId)

  useEffect(() => {
    if (activeImageId == null && data?.length) setActiveImageId(data[0].id)
  }, [activeImageId, data, setActiveImageId])

  useEffect(() => {
    if (!data) return
    const idx = data.findIndex((d) => d.id === activeImageId)
    const next = idx >= 0 && idx + 1 < data.length ? data[idx + 1] : null
    if (next) {
      queryClient.prefetchQuery({ queryKey: ['image', next.id], queryFn: async () => next })
    }
  }, [activeImageId, data, queryClient])

  return (
    <ImageQueue items={items} activeId={activeImageId} onSelect={(id) => setActiveImageId(id)} />
  )
}
