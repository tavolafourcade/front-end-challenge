import Skeleton from '../../../components/ui/Skeleton'

export default function CategoryListSkeleton() {
  return (
    <ul className="list-none p-0 m-0 flex-1 overflow-y-auto">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="p-2">
          <Skeleton className="h-6 w-full" />
        </li>
      ))}
    </ul>
  )
}
