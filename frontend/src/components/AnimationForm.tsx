"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiRequestError, bffFetch } from "@/lib/api";
import { buttonClass, inputClass } from "@/lib/form-styles";
import type { AnimationInput, Director, Genre } from "@/lib/types";
import FormCard from "./FormCard";

const emptyForm: AnimationInput = {
  title: "",
  plot: "",
  year: "",
  cover: "",
  type: "Movies",
  video_link: "",
  directors_id: 0,
  genres_id: 0,
};

type Props = {
  directors: Director[];
  genres: Genre[];
  initialValues?: AnimationInput;
  animationId?: number;
};

export default function AnimationForm({ directors, genres, initialValues, animationId }: Props) {
  const router = useRouter();
  const isEdit = animationId !== undefined;

  const [form, setForm] = useState<AnimationInput>(
    initialValues ?? {
      ...emptyForm,
      directors_id: directors[0]?.id ?? 0,
      genres_id: genres[0]?.id ?? 0,
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = <K extends keyof AnimationInput>(key: K, value: AnimationInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      if (isEdit) {
        await bffFetch(`/api/animations/${animationId}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        router.push(`/animations/${animationId}`);
      } else {
        await bffFetch("/api/animations", {
          method: "POST",
          body: JSON.stringify(form),
        });
        router.push("/");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Something went wrong");
      setPending(false);
    }
  };

  return (
    <FormCard maxWidth="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">{isEdit ? "Edit Animation" : "Add Animation"}</h1>

        {error && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <Field label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Plot">
          <textarea
            required
            value={form.plot}
            onChange={(e) => handleChange("plot", e.target.value)}
            className={inputClass}
            rows={3}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Year">
          <input
            required
            value={form.year}
            onChange={(e) => handleChange("year", e.target.value)}
            placeholder="2001"
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Cover image URL">
          <input
            required
            type="url"
            value={form.cover}
            onChange={(e) => handleChange("cover", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Type">
          <select
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          >
            <option value="Movies">Movies</option>
            <option value="Series">Series</option>
          </select>
        </Field>

        <Field label="YouTube video ID">
          <input
            required
            value={form.video_link}
            onChange={(e) => handleChange("video_link", e.target.value)}
            placeholder="dQw4w9WgXcQ"
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Director">
          <select
            value={form.directors_id}
            onChange={(e) => handleChange("directors_id", Number(e.target.value))}
            className={inputClass}
            suppressHydrationWarning
          >
            {directors.length === 0 && <option value={0}>No directors yet</option>}
            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.first_name} {director.last_name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Genre">
          <select
            value={form.genres_id}
            onChange={(e) => handleChange("genres_id", Number(e.target.value))}
            className={inputClass}
            suppressHydrationWarning
          >
            {genres.length === 0 && <option value={0}>No genres yet</option>}
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </Field>

        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Saving…" : "Save"}
        </button>
      </form>
    </FormCard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
