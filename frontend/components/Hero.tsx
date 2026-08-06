export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-12 py-20">
      <div className="grid grid-cols-2 items-center gap-16">

        {/* Left Side */}
        <div>
          <h1 className="text-black text-5xl font-bold leading-tight">
            A shared family
            <br />
            memoir created by
            <br />
            everyone who
            <br />
            loved them
          </h1>

          <p className="mt-8 text-[22px] leading-10 text-[#333] max-w-xl">
            Share one link to collect voice stories, memories and photos
            from family. Everything is automatically organized into
            chaptered archive and printable pdf.
          </p>

          <div className="flex gap-6 mt-10">
            <button className="bg-[#B7A79A] text-white px-10 py-3 rounded-md">
              Sign up
            </button>

            <button className="bg-[#B7A79A] text-white px-10 py-3 rounded-md">
              Login
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center h-[450px]">
          <h2 className="text-4xl font-bold text-center text-[#1D1D1D]">
            Here preview will be
            <br />
            shown
          </h2>
        </div>

      </div>
    </section>
  );
}