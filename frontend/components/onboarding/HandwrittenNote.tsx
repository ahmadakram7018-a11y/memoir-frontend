import Link from "next/link";

export default function HandwrittenNote() {
  return (
    <section className="flex flex-col items-center justify-center py-20">

      {/* Note */}
      <div className="w-[420px] border border-[#D8CEC7] bg-white rounded-lg p-5">

        <h2 className="font-[family-name:var(--font-caveat)]  text-center text-[34px] font-bold text-black mb-1 -ml-2">
          Dear Hafsa !
        </h2>
        <p className="font-[family-name:var(--font-caveat)] text-[32px] text-[#2C2C2C]">
          Every family has a story worth keeping, the quiet mornings,
          the faded photographs, and the voices you never want to lose.
          We built this space to hold those precious pieces safe for you
          and the ones you love.
        </p>

      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">

        <Link
          href="/signup"
          className="bg-[#a7cdbd] text-white text-[28px] font-bold px-12 py-3 rounded-lg hover:bg-[#a7cdbd] transition"
        >
          Back
        </Link>
 
        <Link
          href="/subscription"
          className="bg-[#a7cdbd] text-white text-[28px] font-bold px-7 py-3 rounded-lg hover:bg-[#a7cdbd] transition"
        >
          Continue
        </Link>

      </div>

    </section>
  );
}