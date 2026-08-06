export default function LoginForm() {
  return (
    <section className="flex justify-center py-16">
      <div className="w-[500px] bg-white border border-[#D8CEC7] p-10">

        {/* Heading */}
        <h1 className="text-center text-5xl font-bold text-black leading-tight">
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
          className="w-full mt-10 border border-black p-3 text-black placeholder:text-gray-600"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 border border-black p-3 text-black placeholder:text-gray-600"
        />

        {/* Remember / Forgot */}
        <div className="flex justify-between mt-6 text-black text-sm">
          <p>Remember me</p>

          <a href="#" className="hover:underline">
            Forgot your Password?
          </a>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          <button className="border border-black py-3 flex justify-center items-center gap-2 text-black rounded">

            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />

            Continue with Google

          </button>

          <button className="bg-[#B7A79A] text-white rounded py-3 font-semibold">
            Login
          </button>

        </div>

        {/* Bottom */}
        <div className="border border-black mt-7 py-3 text-center text-black">

          Not a member yet ?

          <a
            href="#"
            className="text-green-700 font-semibold ml-2"
          >
            Sign up
          </a>

        </div>

      </div>
    </section>
  );
}