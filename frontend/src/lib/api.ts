import type { Animation, Director, Genre } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail)) {
      return body.detail.map((e: { msg: string }) => e.msg).join(", ");
    }
  } catch {
    // response wasn't JSON, fall through to the generic message
  }
  return `Request failed with status ${res.status}`;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiRequestError(res.status, await extractErrorMessage(res));
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// Public reads — safe to call from Server or Client Components.
export function getAnimations(): Promise<Animation[]> {
  return apiFetch<Animation[]>("/", { cache: "no-store" });
}

export function getAnimation(id: number | string): Promise<Animation> {
  return apiFetch<Animation>(`/${id}`, { cache: "no-store" });
}

export function getDirectors(): Promise<Director[]> {
  return apiFetch<Director[]>("/getdirectors/", { cache: "no-store" });
}

export function getDirector(id: number): Promise<Director> {
  return apiFetch<Director>(`/getdirectors/${id}`, { cache: "no-store" });
}

export function getGenres(): Promise<Genre[]> {
  return apiFetch<Genre[]>("/getgenres/", { cache: "no-store" });
}

export function getGenre(id: number): Promise<Genre> {
  return apiFetch<Genre>(`/getgenres/${id}`, { cache: "no-store" });
}

// Public writes (signup) — no auth token required.
export function signupDirector(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
  password: string;
}) {
  return apiFetch<Director>("/adddirectors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function signupCustomer(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
  password: string;
}) {
  return apiFetch("/addcustomers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Authenticated writes — proxied through this app's own /api/* route handlers,
// which attach the director's JWT from an httpOnly cookie. The token itself
// never reaches client-side JavaScript.
export async function bffFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiRequestError(res.status, await extractErrorMessage(res));
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
