type Props = {
  value: string
  onChange: (v: string) => void
}

export default function CategorySearchInput({ value, onChange }: Props) {
  return (
    <div className="mb-5">
      <input
        type="text"
        placeholder="Search options..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-1.5 box-border border border-zinc-800 rounded bg-white"
      />
    </div>
  )
}
