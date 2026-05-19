/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle, Button, Checkbox, HintText, Input, Label } from "@mvp-ui/ui";

const FEATURE_BULLETS = [
  "55+ production-ready components",
  "Dark-safe semantic token system",
  "React Aria accessibility primitives",
  "Tailwind v4 — zero config",
];

export function AuthFormApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!email.includes("@")) {
        setError("Enter a valid email address.");
      } else if (password.length < 8) {
        setError("Incorrect email or password. Please try again.");
      }
    }, 900);
  };

  return (
    <div className="flex h-full">

      {/* Right — form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-bg">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-fg text-sm font-bold">
              M
            </div>
            <span className="text-lg font-semibold text-fg tracking-tight">MVP UI</span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-fg tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-1.5 text-sm text-fg-tertiary">
              Welcome back. Enter your details below.
            </p>
          </div>

          {error && (
            <Alert variant="error">
              <AlertTitle>Sign-in failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" isRequired>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="olivia@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                isInvalid={!!error && !email.includes("@")}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" isRequired>
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm font-medium text-fg-brand hover:text-primary transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                isInvalid={!!error && password.length < 8}
              />
              <HintText>Must be at least 8 characters.</HintText>
            </div>

            <Checkbox
              isSelected={remember}
              onChange={setRemember}
              label="Remember me for 30 days"
            />

            <Button
              type="submit"
              color="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-fg-tertiary">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-fg-brand hover:text-primary transition-colors"
            >
              Sign up
            </a>
          </p>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-fg-quaternary hover:text-fg-tertiary transition-colors"
            >
              ← Back to docs
            </Link>
          </div>
        </div>
      </div>

      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-fg/15 text-primary-fg text-sm font-bold">
              M
            </div>
            <span className="text-lg font-semibold text-primary-fg tracking-tight">
              MVP UI
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-semibold text-primary-fg leading-tight tracking-tight">
              Build faster.
              <br />
              Ship confidently.
            </h1>
            <p className="mt-4 text-base text-primary-fg/70 leading-relaxed">
              The design system for modern SaaS — tokens, components, and AI
              skill files in one package.
            </p>
          </div>

          <ul className="space-y-3">
            {FEATURE_BULLETS.map((text) => (
              <li key={text} className="flex items-center gap-3 text-sm text-primary-fg/80">
                <svg
                  className="h-4 w-4 shrink-0 text-primary-fg"
                  fill="none"
                  viewBox="0 0 16 16"
                  aria-hidden
                >
                  <path
                    d="M3 8l3.5 3.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-fg/40">© 2026 TungMVP</p>
      </div>
    </div>
  );
}
