import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require a signed-in Supabase session. Everything else
// (landing page, /handwritten-note, /login, /signup, /auth/callback) stays
// public — the welcome note is shown *before* signup now, to a visitor who
// isn't authenticated yet, so it can't be gated behind a session check.
const PROTECTED_PATHS = ["/onboarding"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function updateSession(request: NextRequest) {
  // Start from a pass-through response. If `getUser()` below refreshes the
  // session, the new cookies get written onto *this* response object — see
  // the `setAll` handler — so the browser always receives an up-to-date
  // session cookie, on every request, whether or not the route is
  // protected.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mirror any refreshed cookies onto both the incoming request
          // (so this same middleware invocation sees them) and a fresh
          // response object (so the browser actually receives them).
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Deliberately `getUser()`, not `getSession()`. `getSession()` just reads
  // whatever is in the cookie — a expired or tampered cookie would still
  // "pass". `getUser()` sends the token to Supabase's Auth server and asks
  // it to confirm it's still valid, which is the only version of this
  // check that's actually trustworthy in server-side code. Don't add logic
  // between `createServerClient` and this call — the official Supabase
  // guidance is that doing so is a common source of hard-to-debug random
  // logouts, since it can desync the cookie refresh below.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtected(request.nextUrl.pathname) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
