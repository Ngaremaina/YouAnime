import Link from "next/link";

import type { Animation } from "@/lib/types";

export default function AnimationCard({ animation }: { animation: Animation }) {
  return (
    <Link
      href={`/animations/${animation.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- covers come from arbitrary user-supplied URLs */}
      <img
        src={animation.cover}
        alt={animation.title}
        className="aspect-2/3 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-2 font-medium text-foreground group-hover:text-accent">
          {animation.title}
        </p>
        <p className="text-xs text-muted">
          {animation.year} · {animation.type}
        </p>
      </div>
    </Link>
  );
}
