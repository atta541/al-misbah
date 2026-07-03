"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAdmin, type LoginState } from "@/actions/auth";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-sm text-red-600">{message}</p>;
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(
    loginAdmin,
    null,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state?.values) {
      setEmail(state.values.email);
      setPassword(state.values.password);
    }
  }, [state]);

  const hasAuthError = Boolean(state?.error);
  const emailError = state?.fieldErrors?.email?.[0];
  const passwordError = state?.fieldErrors?.password?.[0];

  const inputClass = (hasError: boolean) =>
    [
      "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
      hasError
        ? "border-red-300 ring-2 ring-red-100 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100",
    ].join(" ");

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass(Boolean(emailError || hasAuthError))}
          placeholder="you@example.com"
        />
        <FieldError message={emailError} />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass(Boolean(passwordError || hasAuthError))}
          placeholder="Enter your password"
        />
        <FieldError message={passwordError} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in to admin"}
      </button>
    </form>
  );
}
