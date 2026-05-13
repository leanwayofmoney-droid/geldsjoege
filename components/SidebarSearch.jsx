"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SidebarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
  }

  return (
    <div className="rounded-xl p-5" style={{ border: "1px solid #E2E6EA", backgroundColor: "#FFFFFF" }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: "#2C5A85", letterSpacing: "0.16em" }}>
        Zoeken
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek een bespaartip..."
          aria-label="Zoek een bespaartip"
          className="w-full text-sm pl-3 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
          style={{
            border: "1px solid #E2E6EA",
            backgroundColor: "#F8F9FA",
            color: "#1E2D3D",
          }}
        />
        <button
          type="submit"
          aria-label="Zoeken"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
          style={{ color: "#059669" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
