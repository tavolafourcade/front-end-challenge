import { useMemo, useState } from 'react'

import CategorySearchInput from '../components/CategorySearchInput'
import CategoryList, { type Category } from '../components/CategoryList'
import CategoryListSkeleton from '../components/CategoryListSkeleton'
import ActionButtons from '../components/ActionButtons'

type Props = {
  categories: Category[]
  selectedId: number | null
  onSelect: (id: number) => void
  onDiscard: () => void
  onConfirm: () => void
  confirmDisabled?: boolean
  isLoading?: boolean
  discardLoading?: boolean
  confirmLoading?: boolean
}

export default function SidebarContainer({
  categories,
  selectedId,
  onSelect,
  onDiscard,
  onConfirm,
  confirmDisabled,
  isLoading,
  discardLoading,
  confirmLoading,
}: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories.filter((c) => c.name.toLowerCase().includes(q))
  }, [categories, query])

  return (
    <aside className="w-[300px] bg-zinc-200 p-5 flex flex-col box-border">
      <CategorySearchInput value={query} onChange={setQuery} />
      {isLoading ? (
        <CategoryListSkeleton />
      ) : (
        <CategoryList categories={filtered} selectedId={selectedId} onSelect={onSelect} />
      )}
      <ActionButtons
        onDiscard={onDiscard}
        onConfirm={onConfirm}
        confirmDisabled={confirmDisabled}
        discardLoading={discardLoading}
        confirmLoading={confirmLoading}
      />
    </aside>
  )
}
