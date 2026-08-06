export default function Subscription() {
  return (
    <section className="flex justify-center items-center py-12">
      <div className="w-[430px] border border-[#CFC5BE] bg-white p-8">

        <h1 className="text-[22px] font-bold text-center mb-8 text-black">
          Complete Your Subscription
        </h1>

        {/* Contact */}
        <h2 className="text-[16px] font-bold mb-3 text-black">
          Contact
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-10 border border-black px-3 mb-8 text-black placeholder:text-gray-500 outline-none"
        />

        {/* Payment */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[16px] font-bold text-black">
            Payment
          </h2>

          <div className="flex gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              className="h-5 object-contain"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-5"
            />
          </div>
        </div>

        <p className="text-[13px] text-black mb-4">
          All transactions are secure and encrypted
        </p>

        <input
          type="text"
          placeholder="Card number"
          className="w-full h-10 border border-black px-3 mb-4 text-black placeholder:text-gray-500 outline-none"
        />

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Expiration date (MM/YY)"
            className="flex-1 h-10 border border-black px-3 text-black placeholder:text-gray-500 outline-none"
          />

          <input
            type="text"
            placeholder="Security code"
            className="w-[130px] h-10 border border-black px-3 text-black placeholder:text-gray-500 outline-none"
          />
        </div>

        <input
          type="text"
          placeholder="Name on card"
          className="w-full h-10 border border-black px-3 mb-6 text-black placeholder:text-gray-500 outline-none"
        />

        <div className="flex justify-between">
          <button className="w-[120px] h-10 bg-[#B8A79C] text-white font-semibold rounded">
            Back
          </button>

          <button className="w-[120px] h-10 bg-[#B8A79C] text-white font-semibold rounded">
            Pay Now
          </button>
        </div>

      </div>
    </section>
  );
}