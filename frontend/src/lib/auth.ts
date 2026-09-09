import { cookies } from "next/headers";

import type { Director } from "./types";
import { API_URL } from "./api";

export const SESSION_COOKIE = "youanime_token";

export async function getServerToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function getCurrentDirector(): Promise<Director | null> {
  const token = await getServerToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
