import { getAnimations } from "@/lib/api";
import AnimationGrid from "@/components/AnimationGrid";

export default async function SeriesPage() {
  const animations = await getAnimations();
  const series = animations.filter((animation) => animation.type === "Series");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Series</h1>
      <AnimationGrid animations={series} />
    </div>
  );
}
