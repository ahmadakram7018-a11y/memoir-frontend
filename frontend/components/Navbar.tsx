import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-3 h-22 bg-[#F6ECE8]">
      <Logo />

      <ul className="flex gap-10 text-[26px] font-semibold text-[#2C2C2C] tracking-[0.2px]">
        <li>Home</li>
        <li>Plans</li>
        <li>Our Story</li>
        <li>FAQs</li>
      </ul>
    </nav>
  );
}