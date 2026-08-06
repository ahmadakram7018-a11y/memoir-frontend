export default function HandwrittenNote() {
  return (
    <section className="flex flex-col items-center py-16">

      {/* Note */}
      <div className="w-[250px] border border-[#D8CEC7] bg-white p-6">

        <h2 className="text-center text-3xl text-black mb-6">
          Dear Hafsa !
        </h2>

        <p className="text-center text-black leading-8 text-xl">
          Every family has a story worth keeping, the quiet mornings,
          the faded photographs, and the voices you never want to lose.
          We built this space to hold those precious pieces safe for you
          and the ones you love.
        </p>

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">

        <button className="bg-[#B7A79A] text-white px-10 py-3 rounded">
          Back
        </button>

        <button className="bg-[#B7A79A] text-white px-10 py-3 rounded">
          Continue
        </button>

      </div>

    </section>
  );
}