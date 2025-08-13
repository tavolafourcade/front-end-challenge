type Props = {
  items: Array<{ id: number; label: string }>
}

export default function ImageQueue({ items }: Props) {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-5 bg-zinc-200 p-5 box-border">
      <h2 className="text-xl font-semibold mb-2">Next images in queue:</h2>
      <ul className="flex list-none p-0 m-0 overflow-x-auto gap-2">
        {items.map((i) => (
          <li
            key={i.id}
            className="w-[100px] h-[100px] mr-2 bg-zinc-300 flex items-center justify-center text-sm text-center cursor-pointer"
          >
            {i.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
