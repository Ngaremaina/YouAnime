"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiRequestError, bffFetch } from "@/lib/api";

export default function DeleteAnimationButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Delete this animation? This cannot be undone.")) return;

    setPending(true);
    setError(null);
    try {
      await bffFetch(`/api/animations/${id}`, { method: "DELETE" });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Failed to delete");
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="rounded-md border border-danger px-3 py-1.5 text-sm font-medium text-danger transition hover:bg-danger hover:text-white disabled:opacity-50"
      >
        {pending ? "Deleting…" : "Delete"}
      </button>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
