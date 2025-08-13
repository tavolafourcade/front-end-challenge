export type Category = {
  id: number
  name: string
}

type Props = {
  categories: Category[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function CategoryList({ categories, selectedId, onSelect }: Props) {
  return (
    <ul className="list-none p-0 m-0 flex-1 overflow-y-auto">
      {categories.map((c) => {
        const isSelected = c.id === selectedId
        return (
          <li key={c.id}>
            <button
              type="button"
              className={`w-full text-left p-2 hover:bg-zinc-300 cursor-pointer ${
                isSelected ? 'bg-zinc-300 font-semibold' : ''
              }`}
              onClick={() => onSelect(c.id)}
            >
              {c.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
