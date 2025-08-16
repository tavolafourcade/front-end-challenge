type Props = {
  onDiscard: () => void
  onConfirm: () => void
  confirmDisabled?: boolean
  discardLoading?: boolean
  confirmLoading?: boolean
}

export default function ActionButtons({
  onDiscard,
  onConfirm,
  confirmDisabled,
  discardLoading,
  confirmLoading,
}: Props) {
  return (
    <div className="mt-5 flex justify-between">
      <button
        type="button"
        onClick={onDiscard}
        disabled={discardLoading || confirmLoading}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        {discardLoading ? 'Processing...' : 'Discard'}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={confirmDisabled || discardLoading || confirmLoading}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        {confirmLoading ? 'Processing...' : 'Confirm'}
      </button>
    </div>
  )
}
