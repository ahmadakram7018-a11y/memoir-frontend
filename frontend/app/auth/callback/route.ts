import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Handles two flows that both land here with a `?code=` param, per
// Supabase's PKCE flow: (1) Google OAuth, redirected here from
// `signInWithOAuth`, and (2) email confirmation links, if "Confirm email"
// is enabled in the Supabase dashboard — that link also redirects through
// this same code-exchange route. Both need the code exchanged for a real
// session before the user can go anywhere that reads `auth.getUser()`.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/onboarding";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  // Send a first-time signer-in to onboarding, same as an email/password
  // signup does — but send a returning user (someone who already has a
  // memoir set up) straight into the app instead of back through
  // onboarding. `user_account.full_name` is only ever written at the end
  // of onboarding (see OnboardingFlow.tsx), so its presence is a reliable
  // "has this person already finished onboarding once" signal without
  // needing a new column.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("user_account")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const destination = profile?.full_name ? "/" : next;
    return NextResponse.redirect(`${origin}${destination}`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
