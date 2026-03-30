import { motion } from "framer-motion";
import React from "react";

// Sample data for the overlaid sparkline visualization
const N = 80;
const RAW: number[] = [];
for (let i = 0; i < N; i++) {
  RAW.push(Math.sin(i * 0.15) * 8 + Math.cos(i * 0.23) * 3 + Math.sin(i * 0.37) * 1.5);
}
const DELTA = RAW.map((v, i) => (i === 0 ? 0 : v - RAW[i - 1]));
const DD = DELTA.map((v, i) => (i === 0 ? 0 : v - DELTA[i - 1]));

// Overlaid chart uses a shared y-axis so magnitude differences are visible
const Y_SCALE = Math.max(...[...RAW, ...DELTA, ...DD].map(Math.abs)) * 1.1;

const CVW = 400;
const CVH = 80;

function gPath(data: number[]): string {
  const step = CVW / (data.length - 1);
  return data
    .map((v, i) => {
      const x = i * step;
      const y = CVH / 2 - (v / Y_SCALE) * (CVH / 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function gFill(data: number[]): string {
  const step = CVW / (data.length - 1);
  const lastX = (data.length - 1) * step;
  return `${gPath(data)} L${lastX.toFixed(1)},${CVH / 2} L0,${CVH / 2} Z`;
}

const RAW_PATH = gPath(RAW);
const RAW_FILL = gFill(RAW);
const DELTA_PATH = gPath(DELTA);
const DELTA_FILL = gFill(DELTA);
const DD_PATH = gPath(DD);
const DD_FILL = gFill(DD);

const CHART_LINES = [
  { path: RAW_PATH, fill: RAW_FILL, color: "#22d3ee", fillOp: 0.05, strokeW: 1.5, label: "raw ±11" },
  { path: DELTA_PATH, fill: DELTA_FILL, color: "#38bdf8", fillOp: 0.08, strokeW: 2, label: "Δ ±2.5" },
  { path: DD_PATH, fill: DD_FILL, color: "#2dd4bf", fillOp: 0.12, strokeW: 2.5, label: "ΔΔ ±0.5" },
];

// Waterfall bars: the actual byte-count sums at each stage
const BARS = [
  {
    calc: "5 × 8 B × 2,000",
    result: "80,000 B",
    pct: 100,
    color: "#22d3ee",
    bgColor: "rgba(6, 182, 212, 0.12)",
    borderColor: "rgba(6, 182, 212, 0.2)",
  },
  {
    calc: "5 × 1 B × 2,000",
    result: "10,000 B",
    pct: 12.5,
    color: "#38bdf8",
    bgColor: "rgba(56, 189, 248, 0.25)",
    borderColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    calc: "deflate",
    result: "≈ 4,000 B",
    pct: 5,
    color: "#34d399",
    bgColor: "rgba(52, 211, 153, 0.3)",
    borderColor: "rgba(52, 211, 153, 0.5)",
  },
];

// Annotations between the waterfall bars explaining each transformation
const ARROWS = [
  "delta² encode + varint: near-zero values → 1 byte each",
  "deflate: all users compressed in one pass",
];

export const DeltaNetDiagram: React.FC = () => (
  <div className="relative w-full flex flex-col gap-2 py-2 px-3 select-none">
    {/* Component inventory */}
    <div className="flex items-baseline gap-2 flex-wrap px-0.5">
      <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">
        5 components per user
      </span>
      <div className="flex items-center gap-1.5">
        {["x", "y", "z", "ry", "state"].map((c, i) => (
          <React.Fragment key={c}>
            {i > 0 && i < 4 && (
              <span className="text-[7px] text-slate-700 font-mono">·</span>
            )}
            {i === 3 && (
              <span className="text-[7px] text-slate-700 font-mono">·</span>
            )}
            <span className="text-[9px] text-cyan-300/70 font-mono">{c}</span>
          </React.Fragment>
        ))}
      </div>
      <span className="text-[8px] text-slate-600 font-mono">each int64 (8 B)</span>
    </div>

    {/* Overlaid sparkline: visual evidence that delta encoding shrinks values */}
    <div>
      <div className="relative h-11 bg-slate-800/30 rounded overflow-hidden">
        <svg
          viewBox={`0 0 ${CVW} ${CVH}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <line x1="0" y1={CVH / 2} x2={CVW} y2={CVH / 2} stroke="#1e293b" strokeWidth="1" />
          {CHART_LINES.map((l) => (
            <React.Fragment key={l.label}>
              <path d={l.fill} fill={l.color} opacity={l.fillOp} />
              <path
                d={l.path}
                fill="none"
                stroke={l.color}
                strokeWidth={l.strokeW}
                opacity={0.75}
              />
            </React.Fragment>
          ))}
        </svg>
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-white/15"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="flex gap-3 mt-0.5 px-1">
        {CHART_LINES.map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className="w-2 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
            <span className="text-[7px] font-mono" style={{ color: l.color }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Waterfall: step-by-step byte sums with transformation annotations */}
    <div className="flex flex-col gap-0">
      {BARS.map((b, i) => (
        <React.Fragment key={b.result}>
          {/* Arrow annotation between bars */}
          {i > 0 && (
            <div className="flex items-center gap-1.5 py-1 px-1">
              <span className="text-[8px] text-slate-600">↓</span>
              <span className="text-[8px] text-slate-600 font-mono">{ARROWS[i - 1]}</span>
            </div>
          )}

          {/* Bar + calculation */}
          <div className="flex items-center gap-2">
            <div
              className="h-5 rounded-sm border flex items-center px-2"
              style={{
                width: `${Math.max(b.pct, 3)}%`,
                minWidth: b.pct < 10 ? 8 : undefined,
                backgroundColor: b.bgColor,
                borderColor: b.borderColor,
              }}
            >
              {b.pct > 20 && (
                <span
                  className="text-[7px] font-mono whitespace-nowrap"
                  style={{ color: b.color, opacity: 0.5 }}
                >
                  {b.calc}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 flex-shrink-0">
              <span
                className="text-[11px] font-mono font-bold"
                style={{ color: b.color }}
              >
                {b.result}
              </span>
              {b.pct <= 20 && (
                <span className="text-[8px] text-slate-600 font-mono">{b.calc}</span>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>

    {/* Final calculation: derive the kbps number so it doesn't appear from nowhere */}
    <div className="flex flex-col gap-1 px-0.5 pt-1.5 border-t border-slate-700/20">
      <div className="flex items-center gap-1.5 flex-wrap text-[9px] font-mono text-slate-500">
        <span>80,000 → 4,000 B per tick</span>
        <span className="text-slate-700">·</span>
        <span>20:1 compression</span>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap text-[9px] font-mono text-slate-500">
        <span>
          4,000 B × 20 ticks/s × 8 bits ={" "}
          <span className="text-cyan-300 font-bold">640 kbps</span>
          {" "}per client
        </span>
      </div>
    </div>
  </div>
);
