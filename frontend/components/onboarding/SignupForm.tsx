import Link from "next/link";
import Image from "next/image";

export default function SignupForm() {
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

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
        />


        <Link
          href="/handwritten-note"
          className="block w-full mt-6 py-3 rounded bg-[#a7cdbd] text-white text-[24px] font-bold text-center"
        >
          Continue
        </Link>

        <p className="text-center text-black text-[20px] my-5">
          or
        </p>
 
        <button className="w-full py-3 border border-black rounded text-black text-[20px] font-semibold flex items-center justify-center gap-3">
          <img
            src=".\google.png"
            alt="Google"
            className="w-9 h-5 -ml-1"
          />
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