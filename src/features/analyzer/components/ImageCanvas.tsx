type Props = {
  imageUrl: string
}

export default function ImageCanvas({ imageUrl }: Props) {
  return (
    <div className="flex-1 bg-black flex justify-center items-center overflow-hidden relative">
      <img
        src={imageUrl}
        alt="Image to annotate"
        className="max-w-full max-h-full object-contain"
      />
      <div
        className="absolute border-2 border-red-600"
        style={{ width: 100, height: 75, top: 250, left: 275 }}
      />
    </div>
  )
}
