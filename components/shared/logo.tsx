import Image from "next/image";

export default function Logo({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  return (
    <button
      onClick={() => onNavigate("/")}
      className="flex items-center group"
      aria-label="Go to home"
    >
      <Image
        src="/P-logo.png"
        alt="Prawnbox Logo"
        width={100}
        height={100}
        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
      />
      <span className="text-2xl font-bold text-white">rawnbox</span>
    </button>
  );
}
