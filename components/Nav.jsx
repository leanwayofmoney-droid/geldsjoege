"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import LogoWordmark from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`nav-link hover:text-white transition-colors ${isActive(href) ? "nav-link-active" : ""}`}
      style={{ color: isActive(href) ? "#C8813F" : undefined }}
    >
      {label}
    </Link>
  );

  return (
    <header className="w-full bg-[#0F1A26] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoWordmark variant="dark" showTagline={true} />
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#9BA8B5" }}>
          {navLink("/blog", "Bespaartips")}
          {navLink("/besparen-voor-beginners", "Beginners")}
          {navLink("/over", "Over")}
          <Link
            href="/#nieuwsbrief"
            className="text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{ backgroundColor: "#059669" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#047857"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#059669"}
          >
            Nieuwsbrief
          </Link>
        </nav>

        <button
          className="md:hidden hover:text-white transition-colors"
          style={{ color: "#9BA8B5" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-white/10 px-6 py-5 flex flex-col gap-4 text-sm bg-[#0F1A26]" style={{ color: "#9BA8B5" }}>
          <Link href="/blog" onClick={() => setOpen(false)} className="hover:text-white">Bespaartips</Link>
          <Link href="/besparen-voor-beginners" onClick={() => setOpen(false)} className="hover:text-white">Beginners</Link>
          <Link href="/over" onClick={() => setOpen(false)} className="hover:text-white">Over</Link>
          <Link href="/#nieuwsbrief" onClick={() => setOpen(false)} style={{ color: "#6EE7B7" }}>
            Nieuwsbrief
          </Link>
        </div>
      )}
    </header>
  );
}
