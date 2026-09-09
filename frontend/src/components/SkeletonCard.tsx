export default function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="aspect-2/3 w-full bg-border/60" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-4 w-4/5 rounded bg-border/60" />
        <div className="h-3 w-2/5 rounded bg-border/60" />
      </div>
    </div>
  );
}
