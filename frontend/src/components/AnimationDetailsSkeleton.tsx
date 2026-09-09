export default function AnimationDetailsSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="h-[480px] w-full rounded-lg border border-border bg-surface" />

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="h-80 w-full max-w-56 rounded-lg border border-border bg-surface" />
        <div className="flex flex-1 flex-col gap-3 pt-1">
          <div className="h-7 w-2/3 rounded bg-surface" />
          <div className="h-4 w-full rounded bg-surface" />
          <div className="h-4 w-4/5 rounded bg-surface" />
          <div className="h-3 w-1/3 rounded bg-surface" />
          <div className="h-3 w-1/4 rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}
