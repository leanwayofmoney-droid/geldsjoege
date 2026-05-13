"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="nieuwsbrief"
      className="rounded-3xl px-8 py-14 md:px-16 text-center relative overflow-hidden"
      style={{ backgroundColor: "#1E2D3D" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)" }}
      />

      <p
        className="text-xs font-semibold tracking-widest uppercase mb-4 relative"
        style={{ color: "#6EE7B7", letterSpacing: "0.18em" }}
      >
        Nieuwsbrief
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 leading-snug relative">
        Elke week een nieuwe bespaartip
      </h2>
      <p className="text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed relative" style={{ color: "#9BA8B5" }}>
        Ontvang praktische bespaartips direct in je inbox. Geen spam. Alleen bruikbare inzichten die je direct kunt toepassen.
      </p>

      {status === "success" ? (
        <div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium relative"
          style={{ backgroundColor: "rgba(5,150,105,0.25)", color: "#6EE7B7" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Bedankt! Je staat ingeschreven.
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto relative">
            <input
              type="email"
              required
              placeholder="jouw@email.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#FFFFFF",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="text-white px-6 py-3 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
              style={{ backgroundColor: status === "loading" ? "#047857" : "#059669" }}
              onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#047857"; }}
              onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#059669"; }}
            >
              {status === "loading" ? "Bezig..." : "Inschrijven"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-xs mt-3 relative" style={{ color: "#F87171" }}>
              Er ging iets mis. Probeer het opnieuw.
            </p>
          )}
        </>
      )}
    </section>
  );
}
