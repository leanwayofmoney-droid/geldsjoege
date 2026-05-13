function LogoIcon({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hexagon achtergrond */}
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        fill="#1A2B3C"
      />
      {/* Subtiele rand */}
      <path
        d="M20 4L34 12.5V27.5L20 36L6 27.5V12.5L20 4Z"
        fill="none"
        stroke="#2C5A85"
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* Linkerblad — donkergroen */}
      <path
        d="M20 31
           C18 26 11 21 13 14
           C14.5 9 19 9 20 9
           C20 9 19 18 20 27 Z"
        fill="#059669"
      />

      {/* Rechterblad — lichtgroen, lichte overlap */}
      <path
        d="M20 31
           C22 26 29 21 27 14
           C25.5 9 21 9 20 9
           C20 9 21 18 20 27 Z"
        fill="#34D399"
        opacity="0.9"
      />

      {/* Glanzend stipje boven — geeft diepte */}
      <circle cx="20" cy="9.5" r="1.8" fill="#6EE7B7" opacity="0.6" />

      {/* Kleine stengel onderkant */}
      <rect x="19" y="28" width="2" height="3.5" rx="1" fill="#059669" opacity="0.7" />
    </svg>
  );
}

export default function LogoWordmark({ variant = "light", showTagline = false }) {
  const isDark = variant === "dark";
  const geldColor    = isDark ? "#FFFFFF" : "#1E2D3D";
  const sjoegeColor  = isDark ? "#FFFFFF" : "#1E2D3D";
  const taglineColor = isDark ? "#34D399" : "#059669";

  return (
    <span className="inline-flex items-center gap-2.5" style={{ lineHeight: 1 }}>
      <LogoIcon size={36} />
      <span className="flex flex-col" style={{ gap: showTagline ? "2px" : 0 }}>
        {/* Wordmark */}
        <span
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          <span
            style={{
              color: geldColor,
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
            }}
          >
            GELD
          </span>
          <span
            style={{
              color: sjoegeColor,
              fontWeight: 300,
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
              marginLeft: "0.35em",
            }}
          >
            SJOEGE
          </span>
        </span>

        {/* Tagline — alleen tonen als showTagline=true */}
        {showTagline && (
          <span
            style={{
              color: taglineColor,
              fontWeight: 600,
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Slim &amp; Duurzaam Besparen
          </span>
        )}
      </span>
    </span>
  );
}
