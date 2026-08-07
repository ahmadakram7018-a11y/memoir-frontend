import Link from "next/link";

export default function HandwrittenNote() {
  return (
    <section className="flex flex-col items-center justify-center py-20">

      {/* Note */}
      <div className="w-[420px] border border-[#D8CEC7] bg-white rounded-lg p-8">

        <h2 className="text-center text-[34px] font-bold text-black mb-8">
          Dear Hafsa !
        </h2>

        <p className="text-center text-[30px] font-normal leading-[48px] text-black">
          Every family has a story worth keeping, the quiet mornings,
          the faded photographs, and the voices you never want to lose.
          We built this space to hold those precious pieces safe for you
          and the ones you love.
        </p>

      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">

        <Link
          href="/login"
          className="bg-[#B7A79A] text-white text-[28px] font-bold px-12 py-3 rounded-lg hover:bg-[#A79588] transition"
        >
          Back
        </Link>

        <Link
          href="/subscription"
          className="bg-[#B7A79A] text-white text-[28px] font-bold px-12 py-3 rounded-lg hover:bg-[#A79588] transition"
        >
          Continue
        </Link>

      </div>

    </section>
  );
}