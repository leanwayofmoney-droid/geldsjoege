"use client";
import { useState, useEffect } from "react";

export default function StarRating({ slug }) {
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [hover, setHover] = useState(0);
  const [voted, setVoted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`voted_${slug}`);
    if (stored) setVoted(Number(stored));
    fetch(`/api/rate?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => {
        setAvg(d.avg || 0);
        setCount(d.count || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  async function handleVote(stars) {
    if (voted || saving) return;
    setSaving(true);
    setVoted(stars);
    localStorage.setItem(`voted_${slug}`, String(stars));
    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, stars }),
      });
      if (res.ok) {
        const d = await res.json();
        setAvg(d.avg);
        setCount(d.count);
      }
    } finally {
      setSaving(false);
    }
  }

  const active = hover || voted;
  const displayAvg = avg > 0 ? avg.toFixed(1) : null;

  return (
    <div className="rounded-xl p-5" style={{ border: "1px solid #E2E6EA", backgroundColor: "#FFFFFF" }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: "#2C5A85", letterSpacing: "0.16em" }}>
        Beoordeel deze bespaartip
      </p>

      <div className="flex gap-1.5 mb-3" onMouseLeave={() => !voted && setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleVote(star)}
            onMouseEnter={() => !voted && setHover(star)}
            disabled={!!voted || saving}
            aria-label={`${star} ster${star > 1 ? "ren" : ""}`}
            style={{
              background: "none",
              border: "none",
              padding: "2px",
              cursor: voted ? "default" : "pointer",
              transition: "transform 0.1s",
              transform: !voted && hover === star ? "scale(1.2)" : "scale(1)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={star <= active ? "#F59E0B" : "none"}
              stroke={star <= active ? "#F59E0B" : "#CBD5E0"}
              strokeWidth="1.5"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-xs" style={{ color: "#CBD5E0" }}>Laden...</p>
      ) : voted ? (
        <p className="text-xs font-medium" style={{ color: "#10B981" }}>Bedankt! Jouw stem is opgeslagen.</p>
      ) : (
        <p className="text-xs" style={{ color: "#9BA8B5" }}>Klik om te beoordelen</p>
      )}

      {!loading && count > 0 && (
        <p className="text-xs mt-2" style={{ color: "#F59E0B" }}>
          <span className="font-semibold">★ {displayAvg}</span>
        </p>
      )}
    </div>
  );
}
