"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const RELATIONSHIPS = [
  "Mother",
  "Father",
  "Grandmother",
  "Grandfather",
  "Spouse or partner",
  "Sibling",
  "Child",
  "Friend",
  "Other",
];

type Step = 0 | 1 | 2 | 3;

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>(0);
  const [ownerName, setOwnerName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [customRelationship, setCustomRelationship] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalRelationship =
    relationship === "Other" ? customRelationship.trim() : relationship;

  const canContinue =
    (step === 0 && ownerName.trim().length > 0) ||
    (step === 1 && subjectName.trim().length > 0) ||
    (step === 2 && finalRelationship.length > 0);

  const goBack = () => {
    if (step > 0) setStep((s) => (s - 1) as Step);
  };

  const submitAndAdvance = async () => {
    if (step < 2) {
      setStep((s) => (s + 1) as Step);
      return;
    }

    setSaving(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error: updateError } = await supabase
        .from("user_account")
        .update({ full_name: ownerName.trim() })
        .eq("id", user.id);

      if (updateError) {
        setSaving(false);
        setError("We couldn't save your name — please try again.");
        return;
      }
    }

    // The `memoir` table and this endpoint don't exist on the backend yet
    // (see app/models/subscription.py's memoir_id comment). Attempt the
    // call so the frontend is ready the moment it ships; fail quietly
    // since this can't block onboarding today.
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memoirs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_name: subjectName.trim(),
          relationship: finalRelationship,
        }),
      });
    } catch {
      console.warn("Memoir creation endpoint not available yet — continuing.");
    }

    setSaving(false);
    setStep(3);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div aria-hidden className="glow-orb -left-24 top-1/3 h-96 w-96 bg-accent/10" />

      <div className="relative w-full max-w-md rounded-3xl border border-border bg-paper-raised p-8 shadow-[0_28px_70px_rgba(0,0,0,0.4)] sm:p-10">
        {step < 3 && (
          <>
            <div className="mb-9 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>

            {step === 0 && (
              <StepCard
                key={0}
                title="What should we call you?"
                helper="So we know who's gathering these memories."
              >
                <TextField label="Your name" value={ownerName} onChange={setOwnerName} autoFocus />
              </StepCard>
            )}

            {step === 1 && (
              <StepCard
                key={1}
                title="Whose story are you here to keep?"
                helper="This memoir will be built around them."
              >
                <TextField label="Their name" value={subjectName} onChange={setSubjectName} autoFocus />
              </StepCard>
            )}

            {step === 2 && (
              <StepCard
                key={2}
                title="And what's your relationship to them?"
                helper="This just helps us ask better questions later."
              >
                <div className="flex flex-wrap gap-2">
                  {RELATIONSHIPS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRelationship(r)}
                      className={`rounded-full border px-4 py-2 text-[0.95rem] transition-all duration-500 ease-out ${
                        relationship === r
                          ? "border-accent bg-accent-soft text-accent shadow-[0_0_0_3px_rgba(217,166,92,0.18)]"
                          : "border-border bg-paper text-ink-soft hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink hover:shadow-[0_0_20px_rgba(217,166,92,0.12)]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {relationship === "Other" && (
                  <div className="mt-4 animate-rise">
                    <TextField
                      label="Your relationship"
                      value={customRelationship}
                      onChange={setCustomRelationship}
                      autoFocus
                    />
                  </div>
                )}
              </StepCard>
            )}

            {error && (
              <p role="alert" className="mt-4 text-sm text-error">
                {error}
              </p>
            )}

            <div className="mt-8 flex items-center gap-4">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm text-ink-soft transition-colors duration-500 ease-out hover:text-ink"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={submitAndAdvance}
                disabled={!canContinue || saving}
                className="ml-auto rounded-full bg-accent px-7 py-3 text-base font-semibold text-on-accent shadow-[0_8px_20px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_36px_rgba(217,166,92,0.4)] disabled:translate-y-0 disabled:opacity-40 disabled:shadow-none"
              >
                {saving ? "Saving…" : "Continue"}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="animate-rise text-center">
            <h1 className="font-display text-3xl font-semibold text-ink">
              {subjectName.trim()}&rsquo;s memoir is ready.
            </h1>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
              You can start adding memories yourself, or invite family and
              close friends first — either way, {subjectName.trim()}&rsquo;s
              story starts here.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/"
                className="w-full rounded-full bg-accent py-3.5 text-base font-semibold text-on-accent shadow-[0_8px_20px_rgba(217,166,92,0.25)] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_36px_rgba(217,166,92,0.4)]"
              >
                Invite family & friends
              </Link>
              <Link
                href="/"
                className="w-full rounded-full border border-border bg-paper py-3.5 text-base font-semibold text-ink transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(217,166,92,0.12)]"
              >
                Add your first memory
              </Link>
              <p className="mt-1 text-sm text-ink-faint">
                You can always invite more people later.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StepCard({
  title,
  helper,
  children,
}: {
  title: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-rise">
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 text-[1.02rem] text-ink-soft">{helper}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-[1.05rem] text-ink outline-none transition-all duration-300 ease-out focus:border-accent focus:shadow-[0_0_0_4px_rgba(217,166,92,0.15)]"
      />
    </div>
  );
}
