import ImageQueue from '../components/ImageQueue'

export default function ImageQueueContainer() {
  const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, label: `Image ${i + 1}` }))
  return <ImageQueue items={items} />
}
