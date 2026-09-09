import { proxyToBackend } from "@/lib/api-proxy.server";

export async function POST(request: Request) {
  const body = await request.json();
  return proxyToBackend("/addanimations", "POST", body);
}
