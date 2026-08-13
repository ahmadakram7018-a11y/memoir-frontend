"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import GoogleIcon from "@/components/GoogleIcon";

const supabase = createClient();

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase
        .from("user_account")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", data.user.id);
    }

    router.push("/");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden className="glow-orb -left-24 top-1/4 h-96 w-96 bg-accent/10" />

      <div className="animate-rise relative w-full max-w-md rounded-3xl border border-border bg-paper-raised p-8 shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-10">
        <Link href="/" className="text-sm text-ink-soft transition-colors duration-500 ease-out hover:text-ink">
          &larr; Back
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
          Welcome back
        </h1>
        <p className="mt-2 text-[1.02rem] text-ink-soft">
          Log in to keep gathering their story.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-border bg-ink py-3.5 text-base font-semibold text-paper transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(245,236,221,0.18)] disabled:translate-y-0 disabled:opacity-60"
        >
          <GoogleIcon />
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="my-6 flex items-center gap-4" aria-hidden>
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.14em] text-ink-faint">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-[1.02rem] text-ink outline-none transition-all duration-300 ease-out focus:border-accent focus:shadow-[0_0_0_4px_rgba(217,166,92,0.15)]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-[1.02rem] text-ink outline-none transition-all duration-300 ease-out focus:border-accent focus:shadow-[0_0_0_4px_rgba(217,166,92,0.15)]"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-3.5 text-base font-semibold text-on-accent shadow-[0_8px_24px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_40px_rgba(217,166,92,0.4)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-8 text-center text-[0.95rem] text-ink-soft">
          Not a member yet?{" "}
          <Link href="/handwritten-note" className="font-semibold text-accent transition-colors duration-500 ease-out hover:text-accent-bright hover:underline">
            Start a memoir
          </Link>
        </p>
      </div>
    </section>
  );
}
