"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiRequestError } from "@/lib/api";
import { buttonClass, inputClass } from "@/lib/form-styles";
import FormCard from "./FormCard";

export type SignupFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  age: number;
  password: string;
};

const emptyValues: SignupFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  gender: "",
  age: 18,
  password: "",
};

type Props = {
  title: string;
  redirectTo: string;
  onSubmit: (values: SignupFormValues) => Promise<unknown>;
};

export default function AccountSignupForm({ title, redirectTo, onSubmit }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<SignupFormValues>(emptyValues);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleChange = <K extends keyof SignupFormValues>(key: K, value: SignupFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      await onSubmit(values);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Something went wrong");
      setPending(false);
    }
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">{title}</h1>

        {error && (
          <p className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <Field label="First name">
          <input
            required
            value={values.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Last name">
          <input
            required
            value={values.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Email address">
          <input
            required
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Phone number">
          <input
            required
            value={values.phone_number}
            onChange={(e) => handleChange("phone_number", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Gender">
          <input
            required
            value={values.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Age">
          <input
            required
            type="number"
            min={1}
            value={values.age}
            onChange={(e) => handleChange("age", Number(e.target.value))}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <Field label="Password">
          <input
            required
            type="password"
            minLength={8}
            maxLength={72}
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </Field>

        <button type="submit" disabled={pending} className={buttonClass}>
          {pending ? "Submitting…" : "Submit"}
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
