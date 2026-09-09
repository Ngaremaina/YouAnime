import { notFound } from "next/navigation";
import Link from "next/link";

import { ApiRequestError, getAnimation, getDirector, getGenre } from "@/lib/api";
import { getCurrentDirector } from "@/lib/auth";
import DeleteAnimationButton from "@/components/DeleteAnimationButton";

export default async function AnimationDetailsPage({
  params,
}: PageProps<"/animations/[id]">) {
  const { id } = await params;

  let animation;
  try {
    animation = await getAnimation(id);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) notFound();
    throw err;
  }

  const [director, genre, currentDirector] = await Promise.all([
    getDirector(animation.directors_id).catch(() => null),
    getGenre(animation.genres_id).catch(() => null),
    getCurrentDirector(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg border border-border">
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${animation.video_link}`}
          title={animation.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied cover URL */}
        <img
          src={animation.cover}
          alt={animation.title}
          className="w-full max-w-56 rounded-lg border border-border object-cover"
        />
        <div className="flex flex-1 flex-col gap-2">
          <h1 className="text-2xl font-bold">{animation.title}</h1>
          <p className="text-muted">{animation.plot}</p>
          <p className="text-sm text-muted">
            {animation.year} · {animation.type}
            {genre && ` · ${genre.name}`}
          </p>
          {director && (
            <p className="text-sm text-muted">
              Directed by {director.first_name} {director.last_name}
            </p>
          )}

          {currentDirector && (
            <div className="mt-2 flex gap-2">
              <Link
                href={`/edit-animation/${animation.id}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition hover:bg-surface"
              >
                Edit Animation
              </Link>
              <DeleteAnimationButton id={animation.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
