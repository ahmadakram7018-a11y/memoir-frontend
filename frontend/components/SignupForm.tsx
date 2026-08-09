"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";


export default function SignupForm() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // We will use this to redirect the user after success

  // 2. The function that runs when the form is submitted
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing

    // Quick validation to ensure passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    // 3. Send Email and Password to the Supabase Private Auth DB
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert("Sign up failed: " + authError.message);
      setLoading(false);
      return;
    }

    // 4. Save Name, Email, and UUID to your Public DB
    if (authData.user) {
      const { error: dbError } = await supabase
        .from("user_account") // ⚠️ Verify this matches your actual table name in Supabase
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            full_name: full_name,
          },
        ]);

      if (dbError) {
        alert("Account created, but failed to save profile name.");
        console.error(dbError);
      } else {
        // Success! Redirect them to the next page in your onboarding flow
        router.push("/handwritten-note");
      }
    }
    setLoading(false);
  };
  return (

    <section className="flex justify-center items-center py-20">
      <div className="w-[650px] bg-white border border-[#D8CEC8] rounded-lg p-10">
        <span className="mb-6">
          <Link
            href="/"
            className="inline-flex text-[16px] font-medium text-[#6B5E53] hover:text-[#2C2C2C] transition -ml-2"
          >
            <span><b>←</b></span>
          </Link>
        </span>

        <div className="flex justify-between items-start">
          <h2 className="text-[34px] font-bold text-black">
            Create your account
          </h2>

          <div className="flex flex-col items-end text-[20px] text-black whitespace-nowrap">
            <p>Have an account ?</p>
            <Link
              href="/login"
              className="text-[#3D7C47] text-[20px] font-semibold mr-3"
            >
              Login
            </Link>
          </div>
        </div>

        {/* START OF THE FORM */}
        <form onSubmit={handleSignup}>
          
          <input
            type="text"
            placeholder="Full Name"
            value={full_name} // Connects to your state
            onChange={(e) => setName(e.target.value)} // Updates state as you type
            required // Forces them to fill it out
            className="w-full mt-8 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-4 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block w-full mt-6 py-3 rounded bg-[#a7cdbd] text-white text-[24px] font-bold text-center disabled:opacity-50"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
          
        </form>
        {/*  END OF THE FORM  */}

        <p className="text-center text-[18px] font-semibold text-black mt-6">
          By clicking create an account you agree to the
          <br />
          <span className="text-[#3D7C47] text-[20px] font-normal cursor-pointer hover:underline">
            Terms and Conditions
          </span>
        </p>

      </div>
    </section>
  );
}