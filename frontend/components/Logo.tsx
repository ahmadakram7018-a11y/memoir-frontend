import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Memoir Logo"
      width={120}
      height={45}
      priority
    />
  );
}