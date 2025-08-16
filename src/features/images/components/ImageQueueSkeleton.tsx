import Skeleton from '../../../components/ui/Skeleton'

export default function ImageQueueSkeleton() {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-5 bg-zinc-200 p-5 box-border">
      <Skeleton className="h-8 w-48 mb-2" />
      <ul className="flex list-none p-0 m-0 overflow-x-auto gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="w-[100px] h-[100px] mr-2" />
          </li>
        ))}
      </ul>
    </div>
  )
}
