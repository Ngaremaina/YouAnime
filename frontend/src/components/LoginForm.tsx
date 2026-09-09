"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { buttonClass, inputClass } from "@/lib/form-styles";
import FormCard from "./FormCard";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ detail: "Login failed" }));
      setError(typeof body.detail === "string" ? body.detail : "Login failed");
      setPending(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Director Login</h1>

        {error && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </label>

        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
    </FormCard>
  );
}
