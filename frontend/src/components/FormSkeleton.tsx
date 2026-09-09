export default function FormSkeleton({ fields = 6 }: { fields?: number }) {
  return (
    <div className="mx-auto w-full max-w-lg animate-pulse rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 h-6 w-1/3 rounded bg-border/60" />
      <div className="flex flex-col gap-5">
        {Array.from({ length: fields }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 w-1/4 rounded bg-border/60" />
            <div className="h-10 w-full rounded-lg bg-border/60" />
          </div>
        ))}
        <div className="mt-1 h-10 w-full rounded-lg bg-border/60" />
      </div>
    </div>
  );
}
