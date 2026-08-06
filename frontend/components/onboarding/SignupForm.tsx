export default function SignupForm() {
  return (
    <section className="flex justify-center py-16">
      <div className="w-[520px] bg-white border border-gray-300 p-8">

        <div className="flex justify-between items-start">
          <h2 className="text-4xl font-bold text-black">
            Create your account
          </h2>

          <div className="text-sm text-black text-right whitespace-nowrap">
            <p>Have an account ?</p>
            <a href="#" className="text-green-700 font-semibold">
              Login
            </a>
          </div>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mt-8 p-3 border border-black text-black placeholder:text-gray-600 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-4 p-3 border border-black text-black placeholder:text-gray-600 outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-black text-black placeholder:text-gray-600 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="p-3 border border-black text-black placeholder:text-gray-600 outline-none"
          />
        </div>

        <button className="w-full mt-6 py-3 rounded bg-[#B7A79A] text-white font-semibold">
          Continue
        </button>

        <p className="text-center text-black my-5">or</p>

        <button className="w-full py-3 border border-black rounded text-black">
          Continue with Google
        </button>

        <p className="text-center text-sm text-black mt-6">
          By clicking create an account you agree to the
          <br />
          <span className="text-green-700 font-medium">
            Terms and Conditions
          </span>
        </p>

      </div>
    </section>
  );
}