import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Container className="relative z-10 text-center">
          <Skeleton className="mx-auto h-6 w-48 rounded-full mb-6" />
          <Skeleton className="mx-auto h-16 w-96 rounded-xl mb-4" />
          <Skeleton className="mx-auto h-6 w-64 rounded-xl mb-8" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </Container>
      </section>

      {/* Search Skeleton */}
      <section className="relative z-20 -mt-16 px-4">
        <Container className="max-w-5xl">
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
        </Container>
      </section>

      {/* Features Skeleton */}
      <section className="py-20 bg-background">
        <Container>
          <Skeleton className="mx-auto h-10 w-64 rounded-lg mb-12" />
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
      </section>

      {/* Properties Skeleton */}
      <section className="py-16 bg-background">
        <Container>
          <Skeleton className="h-10 w-96 rounded-lg mb-4" />
          <Skeleton className="h-5 w-64 rounded-lg mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
