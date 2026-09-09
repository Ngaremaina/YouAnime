import { render, screen } from "@testing-library/react";

import AnimationGrid from "@/components/AnimationGrid";
import type { Animation } from "@/lib/types";

const makeAnimation = (overrides: Partial<Animation>): Animation => ({
  id: 1,
  title: "Spirited Away",
  plot: "plot",
  year: "2001",
  cover: "https://example.com/cover.jpg",
  type: "Movies",
  video_link: "abc123",
  directors_id: 1,
  genres_id: 1,
  ...overrides,
});

describe("AnimationGrid", () => {
  it("shows an empty state message when there are no animations", () => {
    render(<AnimationGrid animations={[]} />);
    expect(screen.getByText("No animations found.")).toBeInTheDocument();
  });

  it("renders one card per animation", () => {
    const animations = [
      makeAnimation({ id: 1, title: "Spirited Away" }),
      makeAnimation({ id: 2, title: "Your Name" }),
    ];
    render(<AnimationGrid animations={animations} />);

    expect(screen.getByText("Spirited Away")).toBeInTheDocument();
    expect(screen.getByText("Your Name")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
