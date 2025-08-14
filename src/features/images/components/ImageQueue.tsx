type Props = {
  items: Array<{ id: number; url: string }>
  activeId: number | null
  onSelect: (id: number) => void
}

export default function ImageQueue({ items, activeId, onSelect }: Props) {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-5 bg-zinc-200 p-5 box-border">
      <h2 className="text-xl font-semibold mb-2">Next images in queue:</h2>
      <ul className="flex list-none p-0 m-0 overflow-x-auto gap-2">
        {items.map((i) => {
          console.log(i)
          const isActive = i.id === activeId
          return (
            <li key={i.id}>
              <button
                type="button"
                onClick={() => onSelect(i.id)}
                className={`w-[100px] h-[100px] mr-2 bg-zinc-300 flex items-center justify-center overflow-hidden ${
                  isActive ? 'border-2 border-blue-600' : ''
                }`}
                aria-pressed={isActive}
              >
                <img
                  src={i.url}
                  alt="preview"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
