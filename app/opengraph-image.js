import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Geld Sjoege | Slim besparen voor iedereen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1E2D3D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, color: "#059669", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24 }}>
          GELDFIXES
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: 28, maxWidth: 900 }}>
          Slim besparen voor iedereen
        </div>
        <div style={{ fontSize: 28, color: "#6C7B8B", maxWidth: 700, lineHeight: 1.4 }}>
          Praktische stappen. Direct toepasbaar. Geen kennis nodig.
        </div>
        <div style={{ position: "absolute", bottom: 60, right: 80, fontSize: 22, color: "#059669", fontWeight: 600 }}>
          geldsjoege.nl
        </div>
      </div>
    ),
    { ...size }
  );
}
