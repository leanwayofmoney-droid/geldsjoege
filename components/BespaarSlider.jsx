"use client";
import { useState } from "react";

export default function BespaarSlider({ savingsPerTask, frequentieLabel, savingsEuroLabel }) {
  const mode =
    frequentieLabel === "per kopje"      ? "kopje" :
    frequentieLabel === "per week"       ? "week"  :
    frequentieLabel === "per jaar"       ? "jaar"  :
    frequentieLabel === "per abonnement" ? "abonnement" :
    frequentieLabel === "per uitje"      ? "uitje" :
    "maand";

  const cfg = {
    kopje: {
      min: 1, max: 14, def: 3,
      question: "Hoeveel kopjes koffie koop jij per week?",
      badge:  (n) => `${n}x per week`,
      calc:   (n) => +(n * 52 * savingsPerTask).toFixed(2),
      sub:    (n) => `${n} × 52 weken × €${savingsPerTask} per kopje`,
      minLbl: "1x", maxLbl: "14x",
      rightLabel: "Per kopje",
      yearLabel: "per jaar",
    },
    week: {
      min: 10, max: 52, def: 52,
      question: "Hoeveel weken per jaar gebruik je dit systeem?",
      badge:  (n) => `${n} weken/jaar`,
      calc:   (n) => Math.round(n * savingsPerTask),
      sub:    (n) => `${n} weken × €${savingsPerTask} per week`,
      minLbl: "10 wk", maxLbl: "52 wk",
      rightLabel: "Per week",
      yearLabel: "per jaar",
    },
    jaar: {
      min: 1, max: 10, def: 5,
      question: "Hoe lang hou je dit vol?",
      badge:  (n) => `${n} jaar`,
      calc:   (n) => Math.round(n * savingsPerTask),
      sub:    (n) => `${n} jaar × €${savingsPerTask} per jaar`,
      minLbl: "1 jr", maxLbl: "10 jr",
      rightLabel: "Per jaar",
      yearLabel: `over {n} jaar`,
    },
    abonnement: {
      min: 1, max: 8, def: 3,
      question: "Hoeveel abonnementen zeg je op?",
      badge:  (n) => `${n} abonnement${n > 1 ? "en" : ""}`,
      calc:   (n) => Math.round(n * 12 * savingsPerTask),
      sub:    (n) => `${n} × 12 mnd × €${savingsPerTask}/mnd`,
      minLbl: "1x", maxLbl: "8x",
      rightLabel: "Per abonnement/mnd",
      yearLabel: "per jaar",
    },
    uitje: {
      min: 1, max: 20, def: 4,
      question: "Hoeveel uitjes doe je per jaar?",
      badge:  (n) => `${n}x per jaar`,
      calc:   (n) => Math.round(n * savingsPerTask),
      sub:    (n) => `${n} uitjes × €${savingsPerTask} per uitje`,
      minLbl: "1x", maxLbl: "20x",
      rightLabel: "Per uitje",
      yearLabel: "per jaar",
    },
    maand: {
      min: 1, max: 12, def: 1,
      question: `Hoe vaak doe je dit ${frequentieLabel}?`,
      badge:  (n) => `${n}x per maand`,
      calc:   (n) => Math.round(n * 12 * savingsPerTask),
      sub:    () => null,
      minLbl: "1x", maxLbl: "12x",
      rightLabel: "Besparing per keer",
      yearLabel: "per jaar",
    },
  }[mode];

  const [val, setVal] = useState(cfg.def);
  const euroPerYear = cfg.calc(val);
  const pct = ((val - cfg.min) / (cfg.max - cfg.min)) * 100;
  const isJaar = mode === "jaar";

  const yearLabelText = isJaar
    ? `over ${val} jaar`
    : cfg.yearLabel;

  return (
    <div className="my-10 rounded-2xl p-6 md:p-8"
      style={{ backgroundColor: "#F0F4F8", border: "1px solid #CDD3D9" }}>

      <p className="text-xs font-semibold tracking-widest uppercase mb-6"
        style={{ color: "#2C5A85", letterSpacing: "0.16em" }}>
        De Bespaar-Meter
      </p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium" style={{ color: "#1E2D3D" }}>
            {cfg.question}
          </p>
          <span className="text-sm font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: "#059669", color: "#FFFFFF" }}>
            {cfg.badge(val)}
          </span>
        </div>
        <input
          type="range"
          min={cfg.min}
          max={cfg.max}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          aria-label={cfg.question}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            accentColor: "#059669",
            background: `linear-gradient(to right, #059669 ${pct}%, #CDD3D9 ${pct}%)`,
          }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: "#9BA8B5" }}>
          <span>{cfg.minLbl}</span><span>{cfg.maxLbl}</span>
        </div>
      </div>

      <div className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ backgroundColor: "#1E2D3D" }}>
        <div>
          <p className="text-xs mb-1" style={{ color: "#9BA8B5" }}>
            {isJaar ? "Totale besparing" : "Jouw jaarlijkse besparing"}
          </p>
          <p className="text-3xl font-bold" style={{ color: "#FFFFFF" }}>
            €{euroPerYear.toLocaleString("nl-NL")}{" "}
            <span className="text-lg font-medium" style={{ color: "#6EE7B7" }}>
              {yearLabelText}
            </span>
          </p>
          {cfg.sub(val) && (
            <p className="text-xs mt-1" style={{ color: "#6C7B8B" }}>{cfg.sub(val)}</p>
          )}
          {savingsEuroLabel && mode === "maand" && (
            <p className="text-xs mt-2" style={{ color: "#4CAF82" }}>{savingsEuroLabel}</p>
          )}
        </div>
        <div className="rounded-xl px-5 py-4 text-center min-w-[130px]"
          style={{ backgroundColor: "rgba(5,150,105,0.2)" }}>
          <p className="text-xs mb-1" style={{ color: "#6EE7B7" }}>{cfg.rightLabel}</p>
          <p className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>€{savingsPerTask}</p>
        </div>
      </div>
    </div>
  );
}
