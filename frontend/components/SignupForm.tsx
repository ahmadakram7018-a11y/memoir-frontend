"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import GoogleIcon from "@/components/GoogleIcon";

const supabase = createClient();

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Without this, Supabase's confirmation-email link falls back to
        // whatever "Site URL" is configured in the dashboard and redirects
        // there directly — landing a bare ?code= on the homepage instead
        // of /auth/callback, where exchangeCodeForSession actually runs.
        // Same origin-derived pattern as the Google OAuth redirect below,
        // so it's correct on localhost, every Vercel preview, and prod.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    // TODO(billing): once the backend exposes a Stripe Checkout Session
    // endpoint, redirect here instead — Checkout's success_url should
    // return to /onboarding so onboarding stays the first thing the owner
    // sees after paying, not a payment form. The welcome note already ran
    // before signup now, so it's not part of this handoff anymore.

    if (data.session) {
      // "Confirm email" is off in the Supabase dashboard (or this address
      // was already confirmed elsewhere) — signUp() handed back a live
      // session, so it's safe to move on immediately.
      router.push("/onboarding");
    } else {
      // "Confirm email" is on (Supabase Authentication → Providers →
      // Email → "Confirm email"). signUp() created the account but
      // returned no session — there's nothing to authenticate onboarding's
      // save with yet. Show a "check your email" screen instead of
      // pushing forward into a flow that would fail silently.
      setAwaitingConfirmation(true);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setGoogleLoading(true);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // `window.location.origin` rather than a fixed env var — this is
        // what makes it correct on localhost, on every Vercel preview
        // deployment, and on the production domain, all without needing
        // separate configuration for each. /auth/callback exchanges the
        // code Google sends back for a real session.
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
    // On success the browser is about to navigate to Google — nothing
    // else to do here, and no loading state to reset.
  };

  if (awaitingConfirmation) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
        <div aria-hidden className="glow-orb -left-24 top-1/4 h-96 w-96 bg-accent/10" />
        <div className="animate-rise relative w-full max-w-md rounded-3xl border border-border bg-paper-raised p-8 text-center shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-ink">
            Check your email
          </h1>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">
            We&rsquo;ve sent a confirmation link to{" "}
            <span className="font-semibold text-ink">{email}</span>. Click it
            to activate your account — then come back here to log in.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-on-accent shadow-[0_8px_24px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_40px_rgba(217,166,92,0.4)]"
          >
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden className="glow-orb -left-24 top-1/4 h-96 w-96 bg-accent/10" />

      <div className="animate-rise relative w-full max-w-md rounded-3xl border border-border bg-paper-raised p-8 shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-10">
        <Link href="/" className="text-sm text-ink-soft transition-colors duration-500 ease-out hover:text-ink">
          &larr; Back
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-ink">
          Create your account
        </h1>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-soft">
          This is the account that keeps this memoir safe. You&rsquo;ll
          invite family and close friends once it&rsquo;s set up.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignup}
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

        <form onSubmit={handleSignup} className="space-y-4">
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
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-[1.02rem] text-ink outline-none transition-all duration-300 ease-out focus:border-accent focus:shadow-[0_0_0_4px_rgba(217,166,92,0.15)]"
            />
            <p className="mt-1.5 text-sm text-ink-faint">At least 8 characters.</p>
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
            {loading ? "Creating your account…" : "Continue"}
          </button>

          <p className="text-center text-sm text-ink-faint">
            You&rsquo;re starting a Memoir subscription — $3/month, cancel
            anytime.
          </p>
        </form>

        <p className="mt-8 text-center text-[0.95rem] text-ink-soft">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-accent transition-colors duration-500 ease-out hover:text-accent-bright hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
