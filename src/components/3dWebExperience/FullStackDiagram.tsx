import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const NODE_LABEL =
  "px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest shadow-lg border";

// Server container box (percentage-based)
const SERVER_BOX = { x: 8, y: 4, w: 84, h: 48 };

// Server label
const SERVER_LABEL = { x: 50, y: 13 };

// DeltaNet and Networked DOM inside the server box
const DELTANET = { x: 27, y: 34 };
const DELTANET_BOTTOM = { x: 27, y: 42 };

const NDOM = { x: 55, y: 34 };
const NDOM_BOTTOM = { x: 55, y: 42 };

// MML Documents inside the server box, to the right of Networked DOM
const MML_DOCS = { x: 80, y: 34 };

// Clients below the server box
const CLIENT_A = { x: 22, y: 82 };
const CLIENT_A_TOP = { x: 22, y: 78 };
const CLIENT_B = { x: 50, y: 82 };
const CLIENT_B_TOP = { x: 50, y: 78 };
const CLIENT_C = { x: 78, y: 82 };
const CLIENT_C_TOP = { x: 78, y: 78 };

export const FullStackDiagram: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 8);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Phase 0-1: Client A sends position up via DeltaNet
  // Phase 2-3: DeltaNet broadcasts positions to all clients
  // Phase 4-5: MML doc update flows through Networked DOM
  // Phase 6-7: Networked DOM broadcasts state to clients

  const showPosUp = phase === 0;
  const showPosBroadcast = phase === 2;
  const showMmlUp = phase === 4;
  const showMmlBroadcast = phase === 6;

  return (
    <div className="relative w-full h-80 select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Server container box */}
        <rect
          x={`${SERVER_BOX.x}%`}
          y={`${SERVER_BOX.y}%`}
          width={`${SERVER_BOX.w}%`}
          height={`${SERVER_BOX.h}%`}
          rx="12"
          fill="none"
          stroke="#475569"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity={0.6}
        />

        {/* MML Docs → Networked DOM (horizontal connection) */}
        <line
          x1={`${MML_DOCS.x - 7}%`}
          y1={`${MML_DOCS.y}%`}
          x2={`${NDOM.x + 8}%`}
          y2={`${NDOM.y}%`}
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="6 6"
        />

        {/* DeltaNet to Clients */}
        {[CLIENT_A_TOP, CLIENT_B_TOP, CLIENT_C_TOP].map((c, i) => (
          <line
            key={`dn-${i}`}
            x1={`${DELTANET_BOTTOM.x}%`}
            y1={`${DELTANET_BOTTOM.y}%`}
            x2={`${c.x}%`}
            y2={`${c.y}%`}
            stroke="#0e7490"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity={0.5}
          />
        ))}

        {/* Networked DOM to Clients */}
        {[CLIENT_A_TOP, CLIENT_B_TOP, CLIENT_C_TOP].map((c, i) => (
          <line
            key={`nd-${i}`}
            x1={`${NDOM_BOTTOM.x}%`}
            y1={`${NDOM_BOTTOM.y}%`}
            x2={`${c.x}%`}
            y2={`${c.y}%`}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity={0.4}
          />
        ))}

        {/* Animated packets */}
        <AnimatePresence>
          {/* Position data: Client A → DeltaNet */}
          {showPosUp && (
            <motion.circle
              key="pos-up"
              r="5"
              fill="#22d3ee"
              initial={{ cx: `${CLIENT_A_TOP.x}%`, cy: `${CLIENT_A_TOP.y}%`, opacity: 0 }}
              animate={{
                cx: `${DELTANET_BOTTOM.x}%`,
                cy: `${DELTANET_BOTTOM.y}%`,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}

          {/* Position broadcast: DeltaNet → all clients */}
          {showPosBroadcast &&
            [CLIENT_A_TOP, CLIENT_B_TOP, CLIENT_C_TOP].map((c, i) => (
              <motion.circle
                key={`pos-down-${i}`}
                r="4"
                fill="#22d3ee"
                initial={{
                  cx: `${DELTANET_BOTTOM.x}%`,
                  cy: `${DELTANET_BOTTOM.y}%`,
                  opacity: 0,
                }}
                animate={{ cx: `${c.x}%`, cy: `${c.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            ))}

          {/* MML state: Docs → Networked DOM (horizontal) */}
          {showMmlUp && (
            <motion.circle
              key="mml-up"
              r="5"
              fill="#818cf8"
              initial={{ cx: `${MML_DOCS.x - 7}%`, cy: `${MML_DOCS.y}%`, opacity: 0 }}
              animate={{ cx: `${NDOM.x + 8}%`, cy: `${NDOM.y}%`, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          )}

          {/* MML broadcast: Networked DOM → all clients */}
          {showMmlBroadcast &&
            [CLIENT_A_TOP, CLIENT_B_TOP, CLIENT_C_TOP].map((c, i) => (
              <motion.circle
                key={`mml-down-${i}`}
                r="4"
                fill="#818cf8"
                initial={{ cx: `${NDOM_BOTTOM.x}%`, cy: `${NDOM_BOTTOM.y}%`, opacity: 0 }}
                animate={{ cx: `${c.x}%`, cy: `${c.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            ))}
        </AnimatePresence>
      </svg>

      {/* Server label */}
      <div
        className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${SERVER_LABEL.x}%`, top: `${SERVER_LABEL.y}%` }}
      >
        <div
          className={`${NODE_LABEL} bg-slate-800 border-slate-500/50 text-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.2)]`}
        >
          3D Web Experience Server
        </div>
      </div>

      {/* DeltaNet */}
      <div
        className="absolute z-20 flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${DELTANET.x}%`, top: `${DELTANET.y}%` }}
      >
        <motion.div
          className={`${NODE_LABEL} bg-cyan-950 border-cyan-500/50 text-cyan-300`}
          animate={{
            boxShadow:
              showPosUp || showPosBroadcast
                ? "0 0 20px rgba(34, 211, 238, 0.4)"
                : "0 0 10px rgba(34, 211, 238, 0.1)",
          }}
        >
          DeltaNet
        </motion.div>
        <span className="text-[9px] text-slate-500 font-mono">Position & State</span>
      </div>

      {/* Networked DOM */}
      <div
        className="absolute z-20 flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${NDOM.x}%`, top: `${NDOM.y}%` }}
      >
        <motion.div
          className={`${NODE_LABEL} bg-indigo-950 border-indigo-500/50 text-indigo-300`}
          animate={{
            boxShadow:
              showMmlUp || showMmlBroadcast
                ? "0 0 20px rgba(99, 102, 241, 0.4)"
                : "0 0 10px rgba(99, 102, 241, 0.1)",
          }}
        >
          Networked DOM
        </motion.div>
        <span className="text-[9px] text-slate-500 font-mono">MML Content</span>
      </div>

      {/* MML Documents */}
      <div
        className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${MML_DOCS.x}%`, top: `${MML_DOCS.y}%` }}
      >
        <div className="px-2 py-1 bg-slate-800/80 rounded border border-slate-600/50 text-[9px] text-slate-400 font-mono">
          MML Documents
        </div>
      </div>

      {/* Clients */}
      {[
        { pos: CLIENT_A, label: "Client A" },
        { pos: CLIENT_B, label: "Client B" },
        { pos: CLIENT_C, label: "Client C" },
      ].map(({ pos, label }) => (
        <div
          key={label}
          className="absolute z-10 flex flex-col items-center gap-1 -translate-x-1/2"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        >
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/60 border border-cyan-400/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/60 border border-indigo-400/40" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono">{label}</div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-1 left-2 z-10 flex gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-[9px] text-slate-500 font-mono">Position</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-[9px] text-slate-500 font-mono">MML State</span>
        </div>
      </div>
    </div>
  );
};
