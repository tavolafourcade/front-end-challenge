import { useState } from 'react'

import ImageCanvas from '../components/ImageCanvas'
import Sidebar from '../../categories/containers/SidebarContainer'

export default function AnnotationContainer() {
  const imageUrl = 'https://dummyimage.com/280/c4c4c4/ffffff&text=frame'
  const categories = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
  ]
  const [selectedId, setSelectedId] = useState<number | null>(1)

  return (
    <div className="flex w-full h-[600px] mx-auto box-border">
      <ImageCanvas imageUrl={imageUrl} />
      <Sidebar
        categories={categories}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDiscard={() => {}}
        onConfirm={() => {}}
        confirmDisabled={selectedId == null}
      />
    </div>
  )
}
