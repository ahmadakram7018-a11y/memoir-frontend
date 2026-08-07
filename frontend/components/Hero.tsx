import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="flex justify-between items-center">
        {/* Left Side */}
        <div className="w-full">

          <h1 className="text-[#1D1D1D] text-[48px] font-bold leading-[58px] max-w-[520px]">
            A shared family
            <br />
            memoir created by
            <br />
            everyone who
            <br />
            loved them
          </h1>

          <p className="mt-8 text-[28px] font-normal leading-[42px] text-[#4A4A4A] max-w-[540px]">
            Share one link to collect voice stories, memories and photos
            from family. Everything is automatically organized into
            chaptered archive and printable pdf.
          </p>

          <div className="flex gap-5 mt-9">

            <Link
              href="/signup"
              className="bg-[#B7A79A] text-white text-[28px] font-bold px-10 py-3 rounded-md hover:bg-[#A79588] transition inline-block"
            >
              Sign up
            </Link>

            <Link
              href="/login"
              className="bg-[#B7A79A] text-white text-[28px] font-bold px-10 py-3 rounded-md hover:bg-[#A79588] transition inline-block"
            >
              Login
            </Link>

          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center h-[450px] ml-1">

          <h2 className="text-[32px] font-bold text-left text-[#1D1D1D] leading-[42px]">
            Here preview will be
            <br />
            shown
          </h2>

        </div>

      </div>
    </section>
  );
}