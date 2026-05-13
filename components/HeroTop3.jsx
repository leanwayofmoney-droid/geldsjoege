"use client";
import Link from "next/link";
import { useState } from "react";

function Top3Row({ post, rank }) {
  const [hovered, setHovered] = useState(false);
  const c = post.color || "#059669";
  const nr = String(rank).padStart(2, "0");

  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block"
    >
      <article
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E6EA",
          borderRadius: "16px",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: hovered
            ? `-4px 0 0 ${c}, 0 10px 28px rgba(0,0,0,0.1), 0 0 0 1px ${c}18`
            : `-4px 0 0 ${c}, 0 1px 6px rgba(0,0,0,0.05)`,
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "box-shadow 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.25rem",
            fontWeight: 700,
            lineHeight: 1,
            flexShrink: 0,
            color: c,
            opacity: 0.18,
            letterSpacing: "-0.04em",
            width: "44px",
            textAlign: "right",
          }}
        >
          {nr}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="line-clamp-2"
            style={{
              fontWeight: 600,
              fontSize: "0.875rem",
              lineHeight: 1.35,
              color: "#1E2D3D",
              marginBottom: "6px",
              transition: "color 0.2s",
              ...(hovered ? { color: c } : {}),
            }}
          >
            {post.title}
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
            {post.savingsPerTask && (
              <span style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#059669",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
              }}>
                <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                €{post.savingsPerTask} {post.frequentieLabel}
              </span>
            )}
            {post.categorie && (
              <span style={{
                fontSize: "0.65rem",
                color: "#9BA8B5",
                padding: "1px 8px",
                borderRadius: "100px",
                border: "1px solid #E2E6EA",
                backgroundColor: "#F8F9FA",
              }}>
                {post.categorie}
              </span>
            )}
          </div>
        </div>

        <svg
          width="16"
          height="16"
          fill="none"
          stroke={c}
          viewBox="0 0 24 24"
          style={{
            flexShrink: 0,
            opacity: hovered ? 1 : 0.25,
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "opacity 0.2s, transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
        </svg>
      </article>
    </Link>
  );
}

export default function HeroTop3({ posts }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="eyebrow">Populaire Bespaartips</p>
        <Link
          href="/blog"
          style={{ color: "#C8813F", fontSize: "0.75rem", fontWeight: 500 }}
          className="hover:underline transition-colors"
        >
          Alle tips →
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post, i) => (
          <Top3Row key={post.slug} post={post} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}
