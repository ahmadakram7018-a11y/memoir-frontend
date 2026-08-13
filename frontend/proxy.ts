import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts` —
// confirmed against this project's actual installed version
// (node_modules/next/dist/docs/.../file-conventions/proxy.md), not assumed
// from general Next.js knowledge, since this repo's AGENTS.md flags that
// this version has breaking changes from what's "well known". Same
// mechanism as the old Middleware, new file name and export name only.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Runs on every request except static assets and image optimization
// files. It has to run broadly, not just on /onboarding and
// /handwritten-note — Supabase session cookies expire and need refreshing
// on a schedule, and this is what does that refresh (see
// lib/supabase/middleware.ts). The route-protection check inside decides
// which requests actually get redirected; this matcher only decides which
// requests get the session-refresh treatment at all.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
