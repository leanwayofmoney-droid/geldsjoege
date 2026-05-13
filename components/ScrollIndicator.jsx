"use client";
import { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="flex justify-center pt-10 pb-2 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <div className="animate-bounce" style={{ color: "#C5CDD5" }}>
        <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
