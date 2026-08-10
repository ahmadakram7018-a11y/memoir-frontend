import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 max-w-7xl mx-auto px-8 py-12">

      {/* Left Side: Heading, Description, and Action Buttons */}
      <div className="lg:col-span-7 w-full">

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

        <div className="flex gap-10 mt-9 ml-2">
          <Link
            href="/signup"
            className="w-[180px] h-[70px] bg-[#a7cdbd] text-white text-[28px] font-bold px-8 py-2 rounded-md hover:bg-[#a7cdbd] transition inline-block"
          >
            Sign up
          </Link>

          <Link
            href="/login"
            className="w-[180px] h-[70px] bg-[#a7cdbd] text-white text-[28px] font-bold px-10 py-2 rounded-md hover:bg-[#a7cdbd] transition inline-block"
          >
            Login
          </Link>
        </div>
        <Link
          href="/who_is_this_for"
          className="inline-block w-full sm:w-auto px-8 py-4 bg-[#1a3628] text-white text-center rounded-xl font-medium hover:bg-[#132a1e] transition-colors"
        >
          Begin Your Memoir
        </Link>
      </div>

      {/* Right Side: Preview Placeholder Section */}
      <div className="lg:col-span-5 w-full flex items-center justify-start h-[450px]">

        <h2 className="text-[32px] font-bold text-left text-[#1D1D1D] leading-[42px]">
          Here preview will be
          <br />
          shown
        </h2>

      </div>

    </section>
  );
}