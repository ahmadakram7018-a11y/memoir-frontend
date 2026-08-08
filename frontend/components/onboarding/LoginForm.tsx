import Link from "next/link";
export default function LoginForm() {
  return (
    <section className="flex justify-center items-center py-20">
      <div className="w-[650px] bg-white border border-[#D8CEC8] rounded-lg p-10">
        <span className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[16px] font-medium text-[#6B5E53] hover:text-[#2C2C2C] transition"
          >
            <span><b>←</b></span>
          </Link>
        </span>
        {/* Heading */}
        <h1 className="text-center text-[40px] font-bold leading-[52px] text-black">
          Welcome Back !
          <br />
          Log in to your memoir
          <br />
          account
        </h1>

        {/* Inputs */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mt-10 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 px-5 py-4 border border-black rounded-lg text-[18px] text-black placeholder:text-gray-500 outline-none"
        />


        {/* Remember / Forgot */}
        <div className="flex justify-between items-center mt-6 text-black text-[20px]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#B7A79A]"
            />
            <span className="text-[20px]">Remember me</span>
          </label>

          <a
            href="#"
            className="text-[20px] font-normal hover:underline"
          >
            Forgot your Password?
          </a>
        </div>

        {/* Buttons */}
        <div className="mt-6">

          

          <button
            className="w-full bg-[#a7cdbd] text-white rounded-lg py-4 font-semibold text-center flex items-center justify-center"
          >
            Login
          </button>

        </div>
 
        {/* Bottom */}
        <div className="border border-black rounded-lg mt-7 py-4 text-center text-[20px] text-black">

          Not a member yet ?

          <Link
            href="/signup"
            className="text-[#3D7C47] text-[20px] font-semibold ml-2"
          >
            Sign up
          </Link>

        </div>

      </div>
    </section>
  );
}