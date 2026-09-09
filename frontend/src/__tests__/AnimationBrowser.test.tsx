import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AnimationBrowser from "@/components/AnimationBrowser";
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

const animations = [
  makeAnimation({ id: 1, title: "Spirited Away" }),
  makeAnimation({ id: 2, title: "Your Name" }),
  makeAnimation({ id: 3, title: "Akira" }),
];

describe("AnimationBrowser", () => {
  it("filters animations by title as the user types", async () => {
    const user = userEvent.setup();
    render(<AnimationBrowser animations={animations} />);

    await user.type(screen.getByPlaceholderText("Search by title…"), "your");

    expect(screen.getByText("Your Name")).toBeInTheDocument();
    expect(screen.queryByText("Spirited Away")).not.toBeInTheDocument();
    expect(screen.queryByText("Akira")).not.toBeInTheDocument();
  });

  it("sorts animations alphabetically when the sort toggle is enabled", async () => {
    const user = userEvent.setup();
    render(<AnimationBrowser animations={animations} />);

    await user.click(screen.getByRole("button", { name: "Sort A–Z" }));

    const titles = screen
      .getAllByRole("link")
      .map((link) => link.querySelector("p")?.textContent);
    expect(titles).toEqual(["Akira", "Spirited Away", "Your Name"]);
  });

  it("shows the empty state when the search matches nothing", async () => {
    const user = userEvent.setup();
    render(<AnimationBrowser animations={animations} />);

    await user.type(screen.getByPlaceholderText("Search by title…"), "nonexistent");

    expect(screen.getByText("No animations found.")).toBeInTheDocument();
  });
});
