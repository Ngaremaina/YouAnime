import { redirect } from "next/navigation";

import { getDirectors, getGenres } from "@/lib/api";
import { getCurrentDirector } from "@/lib/auth";
import AnimationForm from "@/components/AnimationForm";

export default async function AddAnimationPage() {
  const currentDirector = await getCurrentDirector();
  if (!currentDirector) redirect("/login");

  const [directors, genres] = await Promise.all([getDirectors(), getGenres()]);

  return <AnimationForm directors={directors} genres={genres} />;
}
