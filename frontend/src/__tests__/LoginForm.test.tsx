import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "@/components/LoginForm";

const push = jest.fn();
const refresh = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, refresh }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
    global.fetch = jest.fn();
  });

  it("logs in and redirects home on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "hayao@example.com");
    await user.type(screen.getByLabelText("Password"), "ghibli-secret");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/login",
      expect.objectContaining({ method: "POST" })
    );
    expect(push).toHaveBeenCalledWith("/");
    expect(refresh).toHaveBeenCalled();
  });

  it("shows an error message when login fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: async () => ({ detail: "Incorrect email or password" }),
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "hayao@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Incorrect email or password")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
