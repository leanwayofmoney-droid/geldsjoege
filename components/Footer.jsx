import Link from "next/link";
import LogoWordmark from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0F1A26] mt-24">
      <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <div className="mb-4">
            <LogoWordmark variant="dark" />
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#6C7B8B" }}>
            Slim én duurzaam besparen. Voor jezelf én het milieu.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium mb-1 text-white">Navigatie</p>
          <Link href="/blog" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Bespaartips</Link>
          <Link href="/over" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Over</Link>
          <Link href="/#nieuwsbrief" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Nieuwsbrief</Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="font-medium mb-1 text-white">Onderwerpen</p>
          <Link href="/besparen-voor-beginners" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Besparen voor beginners</Link>
          <Link href="/energie-besparen" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Energie besparen</Link>
          <Link href="/abonnementen-opzeggen" className="hover:text-white transition-colors" style={{ color: "#9BA8B5" }}>Abonnementen opzeggen</Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 text-xs" style={{ color: "#4E5D6C" }}>
          © {new Date().getFullYear()} Geld Sjoege. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
