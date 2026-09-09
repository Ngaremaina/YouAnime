import { render, screen } from "@testing-library/react";

import AnimationCard from "@/components/AnimationCard";
import type { Animation } from "@/lib/types";

const animation: Animation = {
  id: 1,
  title: "Spirited Away",
  plot: "A girl wanders into a spirit world.",
  year: "2001",
  cover: "https://example.com/cover.jpg",
  type: "Movies",
  video_link: "abc123",
  directors_id: 1,
  genres_id: 1,
};

describe("AnimationCard", () => {
  it("renders the title, year, type, and a link to the details page", () => {
    render(<AnimationCard animation={animation} />);

    expect(screen.getByText("Spirited Away")).toBeInTheDocument();
    expect(screen.getByText("2001 · Movies")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/animations/1");
  });

  it("uses the animation title as the cover image alt text", () => {
    render(<AnimationCard animation={animation} />);
    expect(screen.getByRole("img", { name: "Spirited Away" })).toHaveAttribute(
      "src",
      animation.cover
    );
  });
});
