"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [error, action, pending] = useActionState(login, undefined);
  const [visible, setVisible] = useState(false);

  return (
    <form action={action} className="w-full max-w-md border border-border bg-card p-8 shadow-[0_24px_80px_rgba(28,25,23,0.08)] sm:p-10">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-accent">CV Studio</p>
      <h1 className="mt-3 font-serif text-4xl leading-none tracking-[-0.03em]">Admin access</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Enter the configured password to edit bilingual CV content.
      </p>

      <div className="mt-8">
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <div className="relative mt-2">
          <input
            className="h-12 w-full border border-border bg-background px-3 pr-12 text-base"
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            required
            autoFocus
            autoComplete="current-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center px-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
            onClick={() => setVisible((value) => !value)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
        {error && (
          <p id="login-error" role="alert" className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <button
        className="mt-8 h-12 w-full border border-primary bg-primary text-sm font-medium text-primary-foreground transition-colors duration-200 hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
