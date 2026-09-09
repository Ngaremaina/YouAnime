import { ApiRequestError, getAnimation, getAnimations } from "@/lib/api";

describe("api client", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns parsed JSON on a successful request", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [{ id: 1, title: "Spirited Away" }],
    });

    const animations = await getAnimations();
    expect(animations).toEqual([{ id: 1, title: "Spirited Away" }]);
  });

  it("throws an ApiRequestError with the backend's detail message on failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ detail: "Animation with id 999 not found" }),
    });

    await expect(getAnimation(999)).rejects.toMatchObject({
      status: 404,
      message: "Animation with id 999 not found",
    });
  });

  it("joins FastAPI validation error arrays into a single message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({
        detail: [{ msg: "field required" }, { msg: "value is not a valid integer" }],
      }),
    });

    try {
      await getAnimation(1);
      fail("expected getAnimation to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiRequestError);
      expect((err as ApiRequestError).message).toBe(
        "field required, value is not a valid integer"
      );
    }
  });

  it("falls back to a generic message when the error body isn't JSON", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("not json");
      },
    });

    await expect(getAnimation(1)).rejects.toMatchObject({
      status: 500,
      message: "Request failed with status 500",
    });
  });
});
