export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 260 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Muntstuk bovenpaneel */}
      <rect x="60" y="18" width="140" height="114" rx="14"
        fill="#0F1A26" stroke="#059669" strokeWidth="0.8" strokeOpacity="0.4" />
      <rect x="70" y="27" width="120" height="96" rx="10"
        fill="none" stroke="#059669" strokeWidth="0.4" strokeOpacity="0.15" />

      {/* Euro glow */}
      <circle cx="130" cy="75" r="26" fill="#059669" opacity="0.07" />
      <circle cx="130" cy="75" r="14" fill="#059669" opacity="0.1" />

      {/* Euro teken */}
      <text x="130" y="83" textAnchor="middle"
        style={{ fontSize: "28px", fontWeight: 700, fill: "#059669", fontFamily: "Inter, sans-serif" }}>
        €
      </text>

      {/* Neerwaartse geldstroom lijnen */}
      <line x1="130" y1="132" x2="130" y2="168" stroke="#059669" strokeWidth="1.5" strokeOpacity="0.5" />

      {[
        { endY: 248, opacity: 0.22, sw: 1.4 },
        { endY: 260, opacity: 0.38, sw: 1.5 },
        { endY: 272, opacity: 0.55, sw: 1.6 },
        { endY: 283, opacity: 0.78, sw: 2 },
        { endY: 294, opacity: 0.55, sw: 1.6 },
        { endY: 306, opacity: 0.38, sw: 1.5 },
        { endY: 318, opacity: 0.22, sw: 1.4 },
      ].map(({ endY, opacity, sw }, i) => (
        <path
          key={i}
          d={`M 130 168 C 130 245 228 ${endY} 228 ${endY}`}
          stroke="#059669"
          strokeWidth={sw}
          opacity={opacity}
          strokeLinecap="round"
        />
      ))}

      {/* Pijl rechts */}
      <line x1="227" y1="283" x2="248" y2="283" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 241 274 L 251 283 L 241 292"
        stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="200" y="240" width="60" height="90" fill="url(#glow)" opacity="0.18" />
      <defs>
        <radialGradient id="glow" cx="0%" cy="50%" r="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#0B1520" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
