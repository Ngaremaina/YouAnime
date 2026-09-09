import type { Animation } from "@/lib/types";
import AnimationCard from "./AnimationCard";

export default function AnimationGrid({ animations }: { animations: Animation[] }) {
  if (animations.length === 0) {
    return (
      <p className="py-16 text-center text-muted">No animations found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {animations.map((animation) => (
        <AnimationCard key={animation.id} animation={animation} />
      ))}
    </div>
  );
}
