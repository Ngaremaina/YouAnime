"use client";

import { useMemo, useState } from "react";

import type { Animation } from "@/lib/types";
import AnimationGrid from "./AnimationGrid";

export default function AnimationBrowser({ animations }: { animations: Animation[] }) {
  const [search, setSearch] = useState("");
  const [sortByTitle, setSortByTitle] = useState(false);

  const visible = useMemo(() => {
    const filtered = animations.filter((animation) =>
      animation.title.toLowerCase().includes(search.toLowerCase())
    );
    if (!sortByTitle) return filtered;
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }, [animations, search, sortByTitle]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title…"
          className="w-full max-w-sm rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent sm:w-auto"
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-form-type="other"
          suppressHydrationWarning
        />
        <button
          type="button"
          onClick={() => setSortByTitle((v) => !v)}
          aria-pressed={sortByTitle}
          className="rounded-md border border-border px-3 py-2 text-sm text-muted transition hover:text-foreground"
        >
          {sortByTitle ? "Sorted A–Z" : "Sort A–Z"}
        </button>
      </div>
      <AnimationGrid animations={visible} />
    </div>
  );
}
