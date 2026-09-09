import { NextResponse } from "next/server";

import { API_URL } from "./api";
import { getServerToken } from "./auth";

/**
 * Forwards a mutating request to the FastAPI backend with the director's JWT
 * attached, so the token itself never has to reach client-side JavaScript.
 */
export async function proxyToBackend(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown
): Promise<NextResponse> {
  const token = await getServerToken();
  if (!token) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const status = res.status;
  if (status === 204 || res.headers.get("content-length") === "0") {
    return new NextResponse(null, { status });
  }

  const data = await res.json().catch(() => null);
  return NextResponse.json(data, { status });
}
