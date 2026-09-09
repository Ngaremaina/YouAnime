import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AccountSignupForm from "@/components/AccountSignupForm";
import { ApiRequestError } from "@/lib/api";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

async function fillCommonFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("First name"), "Jane");
  await user.type(screen.getByLabelText("Last name"), "Doe");
  await user.type(screen.getByLabelText("Email address"), "jane@example.com");
  await user.type(screen.getByLabelText("Phone number"), "555-0100");
  await user.type(screen.getByLabelText("Gender"), "female");
  await user.clear(screen.getByLabelText("Age"));
  await user.type(screen.getByLabelText("Age"), "28");
  await user.type(screen.getByLabelText("Password"), "hunter2222");
}

describe("AccountSignupForm", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("calls onSubmit with form values and redirects on success", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<AccountSignupForm title="Customer Sign Up" redirectTo="/" onSubmit={onSubmit} />);
    await fillCommonFields(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ first_name: "Jane", email: "jane@example.com", age: 28 })
    );
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows the API error message when submission fails", async () => {
    const onSubmit = jest.fn().mockRejectedValue(new ApiRequestError(422, "Email already taken"));
    const user = userEvent.setup();

    render(<AccountSignupForm title="Customer Sign Up" redirectTo="/" onSubmit={onSubmit} />);
    await fillCommonFields(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Email already taken")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
