export default function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-300 rounded ${className ?? ''}`} />
}
