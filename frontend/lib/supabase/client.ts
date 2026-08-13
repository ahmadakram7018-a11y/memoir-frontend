import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Unlike the old `createClient` from
// `@supabase/supabase-js` (which keeps the session in localStorage only),
// `createBrowserClient` mirrors the session into cookies too — that's the
// only way server code (middleware, the /auth/callback route handler) can
// ever see that a user is logged in, since server code has no access to
// localStorage. Call this fresh in each client component rather than
// exporting one shared instance — that's the pattern the official Supabase
// Next.js SSR guide uses, and it avoids any risk of stale state across
// client-side navigations.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
