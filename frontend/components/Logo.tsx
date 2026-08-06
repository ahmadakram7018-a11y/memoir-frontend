import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Memoir Logo"
      width={220}
      height={220}
      priority
    />
  );
}