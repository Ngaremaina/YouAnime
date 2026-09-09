import { getAnimations } from "@/lib/api";
import AnimationBrowser from "@/components/AnimationBrowser";

export default async function HomePage() {
  const animations = await getAnimations();

  return <AnimationBrowser animations={animations} />;
}
