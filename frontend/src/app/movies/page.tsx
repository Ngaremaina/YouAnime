import { getAnimations } from "@/lib/api";
import AnimationGrid from "@/components/AnimationGrid";

export default async function MoviesPage() {
  const animations = await getAnimations();
  const movies = animations.filter((animation) => animation.type === "Movies");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Movies</h1>
      <AnimationGrid animations={movies} />
    </div>
  );
}
