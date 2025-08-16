import Skeleton from '../../../components/ui/Skeleton'

export default function ImageCanvasSkeleton() {
  return (
    <div className="flex-1 bg-black flex justify-center items-center overflow-hidden relative">
      <Skeleton className="w-full h-full max-w-[400px] max-h-[300px]" />
    </div>
  )
}
