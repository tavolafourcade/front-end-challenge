type Props = {
  onDiscard: () => void
  onConfirm: () => void
  confirmDisabled?: boolean
}

export default function ActionButtons({ onDiscard, onConfirm, confirmDisabled }: Props) {
  return (
    <div className="mt-5 flex justify-between">
      <button type="button" onClick={onDiscard} className="px-4 py-2 border rounded">
        Discard
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Confirm
      </button>
    </div>
  )
}
