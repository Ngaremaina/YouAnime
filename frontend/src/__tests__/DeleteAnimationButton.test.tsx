import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DeleteAnimationButton from "@/components/DeleteAnimationButton";

const push = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

describe("DeleteAnimationButton", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
    global.fetch = jest.fn();
    window.confirm = jest.fn();
  });

  it("does nothing if the user cancels the confirmation", async () => {
    (window.confirm as jest.Mock).mockReturnValue(false);
    const user = userEvent.setup();
    render(<DeleteAnimationButton id={1} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("deletes the animation and redirects home on confirmation", async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ detail: "deleted" }),
    });

    const user = userEvent.setup();
    render(<DeleteAnimationButton id={1} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/animations/1",
      expect.objectContaining({ method: "DELETE" })
    );
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows an error message if the delete request fails", async () => {
    (window.confirm as jest.Mock).mockReturnValue(true);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ detail: "Not authenticated" }),
    });

    const user = userEvent.setup();
    render(<DeleteAnimationButton id={1} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(await screen.findByText("Not authenticated")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
