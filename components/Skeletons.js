export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/5" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton mt-4 h-3 w-16" />
      <div className="mt-2 flex items-center justify-between">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 9 }) {
  return (
    <div role="status" aria-label="লোড হচ্ছে…" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
