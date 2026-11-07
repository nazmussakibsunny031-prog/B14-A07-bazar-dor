import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton mt-10 h-6 w-48" />
      <div className="mt-4">
        <GridSkeleton count={6} />
      </div>
    </div>
  );
}
