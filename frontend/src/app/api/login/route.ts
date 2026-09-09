import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { API_URL } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Login failed" }));
    return NextResponse.json({ detail: body.detail ?? "Login failed" }, { status: res.status });
  }

  const { access_token: accessToken } = await res.json();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return NextResponse.json({ ok: true });
}
