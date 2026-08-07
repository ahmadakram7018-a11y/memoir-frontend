import Link from "next/link";
import Image from "next/image";

export default function SignupForm() {
  return (
    <section className="flex justify-center items-center py-20">
      <div className="w-[650px] bg-white border border-[#D8CEC8] rounded-lg p-10">

        <div className="flex justify-between items-start">
          <h2 className="text-[34px] font-bold text-black">
            Create your account
          </h2>

          <div className="text-[20px] text-black text-right whitespace-nowrap">
            <p>Have an account ?</p>

            <Link
              href="/login"
              className="text-[#3D7C47] text-[20px] font-semibold"
            >
              Login
            </Link>

          </div>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mt-8 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-4 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">

          <input
            type="password"
            placeholder="Password"
            className="px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
          />

        </div>

        <Link
          href="/handwritten-note"
          className="block w-full mt-6 py-3 rounded bg-[#B7A79A] text-white text-[24px] font-bold text-center"
        >
          Continue
        </Link>

        <p className="text-center text-black text-[20px] my-5">
          or
        </p>

        <button className="w-full py-3 border border-black rounded text-black text-[20px] font-semibold flex items-center justify-center gap-3">
          Continue with Google
        </button>

        <p className="text-center text-[18px] font-semibold text-black mt-6">
          By clicking create an account you agree to the
          <br />

          <span className="text-[#3D7C47] text-[20px] font-normal">
            Terms and Conditions
          </span>

        </p>

      </div>
    </section>
  );
}