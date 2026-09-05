import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="h-dvh overflow-hidden bg-background">
      <Container className="flex h-full flex-col justify-center gap-6">
        {/* Hero skeleton */}
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-16 w-96 rounded-xl" />
          <Skeleton className="h-6 w-64 rounded-xl" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>

        {/* Search skeleton */}
        <div className="relative -mt-8">
          <div className="rounded-3xl shadow-2xl bg-card p-6 md:p-8">
            <Skeleton className="h-8 w-32 rounded-lg mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Skeleton className="h-10 col-span-2 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Feature grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border p-8">
              <Skeleton className="size-14 rounded-xl mb-5" />
              <Skeleton className="h-5 w-32 rounded-md mb-2" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
