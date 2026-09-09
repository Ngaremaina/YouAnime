import { proxyToBackend } from "@/lib/api-proxy.server";

export async function PUT(request: Request, ctx: RouteContext<"/api/animations/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  return proxyToBackend(`/putanimation/${id}`, "PUT", body);
}

export async function PATCH(request: Request, ctx: RouteContext<"/api/animations/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  return proxyToBackend(`/patchanimations/${id}`, "PATCH", body);
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/animations/[id]">) {
  const { id } = await ctx.params;
  return proxyToBackend(`/deleteanimation/${id}`, "DELETE");
}
