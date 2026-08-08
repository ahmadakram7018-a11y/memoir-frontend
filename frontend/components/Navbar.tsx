import Logo from "./Logo";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-3 h-22 bg-[#eff1f3]">

      <Logo />

      <ul className="flex items-center gap-10 text-[18px] font-medium text-[#2C2C2C] tracking-[0.2px]">
        <li>
          <Link href="/" className="hover:text-[#B7A79A] transition">
            Home
          </Link>
        </li>
        <li>
          Plans
        </li>
        <li>
          Our Story
        </li>
        <li>
          FAQs
        </li>
      </ul>

    </nav>
  );
}