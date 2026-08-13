// Deprecated — do not import from here. This used
// `@supabase/supabase-js`'s plain `createClient`, which keeps the session
// in localStorage only. That's invisible to server code (middleware, the
// /auth/callback route), which is what route protection and OAuth depend
// on. All call sites now use `createClient()` from "@/lib/supabase/client"
// instead (built on `@supabase/ssr`'s `createBrowserClient`, which mirrors
// the session into cookies). This file is kept only so a stray old import
// fails loudly at compile time rather than silently reintroducing a
// client whose session middleware can't see.
export { createClient } from "./supabase/client";
