"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function NieuwBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: "#22C55E",
        color: "#FFFFFF",
        letterSpacing: "0.04em",
        boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
      }}
    >
      <span
        style={{
          width: "6px", height: "6px", borderRadius: "50%",
          backgroundColor: "#FFFFFF", display: "inline-block",
          animation: "pulse 1.8s ease-in-out infinite",
        }}
      />
      Nieuw
    </span>
  );
}

export default function ReceptCard({ post, wide = false, isNew = false }) {
  const c = post.color || "#059669";
  const [hovered, setHovered] = useState(false);

  if (wide) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <article
          className="rounded-2xl overflow-hidden relative transition-all duration-300 group-hover:-translate-y-1"
          style={{
            boxShadow: hovered
              ? `-4px 0 0 ${c}, 0 16px 40px rgba(0,0,0,0.18), 0 0 0 1px ${c}22`
              : `-4px 0 0 ${c}, 0 2px 12px rgba(0,0,0,0.1)`,
            transition: "box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="relative" style={{ height: "320px" }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(15,26,38,0.95) 0%, rgba(15,26,38,0.5) 50%, rgba(15,26,38,0.1) 100%)",
            }} />

            <span aria-hidden="true" style={{
              position: "absolute", right: "-10px", bottom: "-20px",
              fontSize: "13rem", fontWeight: 900, color: c,
              opacity: 0.13, lineHeight: 1, pointerEvents: "none", userSelect: "none",
            }}>
              {post.savingsPerTask}
            </span>

            {isNew && (
              <div className="absolute top-5 right-5">
                <NieuwBadge />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                style={{ backgroundColor: `${c}30`, color: "#FFFFFF", border: `1px solid ${c}50`, backdropFilter: "blur(4px)" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Bespaart €{post.savingsPerTask} {post.frequentieLabel}
              </span>

              <h2 className="text-2xl md:text-3xl font-semibold text-white leading-snug mb-3 max-w-2xl">
                {post.title}
              </h2>
              <div className="flex items-center justify-between">
                <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#9BA8B5" }}>
                  {post.excerpt}
                </p>
                <span className="text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150 ml-6 whitespace-nowrap flex-shrink-0"
                  style={{ color: c }}>
                  Bekijk Bespaartip →
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        className="bg-white rounded-2xl overflow-hidden h-full flex flex-col"
        style={{
          border: "1px solid #E2E6EA",
          boxShadow: hovered
            ? `-4px 0 0 ${c}, 0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px ${c}18`
            : `-4px 0 0 ${c}, 0 2px 8px rgba(0,0,0,0.07)`,
          transform: hovered ? "translateY(-4px)" : "translateY(0px)",
          transition: "box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="relative h-44 flex-shrink-0 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {isNew && (
            <div className="absolute top-3 right-3">
              <NieuwBadge />
            </div>
          )}
          <div className="absolute bottom-3 left-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#059669", color: "#FFFFFF" }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              €{post.savingsPerTask} {post.frequentieLabel}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-semibold text-base leading-snug mb-2 transition-colors duration-150"
            style={{ color: "#1E2D3D" }}>
            <span className="group-hover:text-[#059669]">{post.title}</span>
          </h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "#6C7B8B" }}>
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-4 pt-4"
            style={{ borderTop: "1px solid #F1F3F5" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#9BA8B5" }}>{post.readTime} lezen</span>
              {post.categorie && (
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F0F4F8", color: "#6C7B8B" }}>
                  {post.categorie}
                </span>
              )}
            </div>
            <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ color: c }}>
              Bekijk Bespaartip →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
