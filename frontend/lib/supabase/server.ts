import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client, for use in Route Handlers (like
// /auth/callback) and Server Components. Reads/writes the session via
// Next.js's cookie store instead of localStorage. `cookies()` is async in
// Next.js 15+, so this function is async too — callers must `await` it.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` throws when called from a Server Component render
            // (Next.js only allows cookie writes from Route Handlers and
            // Server Actions). Safe to ignore here — middleware is what
            // actually refreshes the session cookie on every request; this
            // catch just stops that particular call site from crashing.
          }
        },
      },
    },
  );
}
