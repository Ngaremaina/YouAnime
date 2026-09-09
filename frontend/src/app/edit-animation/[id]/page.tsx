import { notFound, redirect } from "next/navigation";

import { ApiRequestError, getAnimation, getDirectors, getGenres } from "@/lib/api";
import { getCurrentDirector } from "@/lib/auth";
import AnimationForm from "@/components/AnimationForm";

export default async function EditAnimationPage({
  params,
}: PageProps<"/edit-animation/[id]">) {
  const currentDirector = await getCurrentDirector();
  if (!currentDirector) redirect("/login");

  const { id } = await params;

  let animation;
  try {
    animation = await getAnimation(id);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) notFound();
    throw err;
  }

  const [directors, genres] = await Promise.all([getDirectors(), getGenres()]);

  return (
    <AnimationForm
      directors={directors}
      genres={genres}
      animationId={animation.id}
      initialValues={{
        title: animation.title,
        plot: animation.plot,
        year: animation.year,
        cover: animation.cover,
        type: animation.type,
        video_link: animation.video_link,
        directors_id: animation.directors_id,
        genres_id: animation.genres_id,
      }}
    />
  );
}
