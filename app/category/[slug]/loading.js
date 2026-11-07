import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton mt-4 h-14 w-full rounded-2xl" />
      <p className="sr-only">লোড হচ্ছে…</p>
      <div className="mt-6">
        <GridSkeleton count={6} />
      </div>
    </div>
  );
}
