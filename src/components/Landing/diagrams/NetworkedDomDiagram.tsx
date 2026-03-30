import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const StateBar = ({ colors }: { colors: string[] }) => (
  <div className="flex gap-1.5 p-1.5 bg-slate-900 rounded-md border border-slate-700 shadow-inner">
    {colors.map((c, i) => (
      <motion.div
        key={i}
        className="w-3 h-3 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)]"
        animate={{ backgroundColor: c }}
        initial={false}
        transition={{ duration: 0.3 }}
      />
    ))}
  </div>
);

// All positions as percentages of the container
const SERVER = { x: 50, y: 12 };
const CLIENT_A = { x: 22, y: 78 };
const CLIENT_B = { x: 78, y: 78 };
const CLIENT_C = { x: 50, y: 78 };

// Line endpoints: just below server, just above clients
const SERVER_BOTTOM = { x: 50, y: 22 };
const CLIENT_A_TOP = { x: 22, y: 77 };
const CLIENT_B_TOP = { x: 78, y: 77 };
const CLIENT_C_TOP = { x: 50, y: 77 };

export const NetworkedDomDiagram: React.FC = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 10);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const stateBlue = ["#6366f1", "#6366f1", "#6366f1"];
  const stateRed = ["#6366f1", "#f43f5e", "#6366f1"];
  const stateGreen = ["#6366f1", "#f43f5e", "#10b981"];

  const getServerState = () => {
    if (phase >= 8) return stateBlue;
    if (phase >= 5) return stateGreen;
    if (phase >= 1) return stateRed;
    return stateBlue;
  };

  const getClientABState = () => {
    if (phase >= 9) return stateBlue;
    if (phase >= 8) return stateGreen;
    if (phase >= 6) return stateGreen;
    if (phase >= 5) return stateRed;
    if (phase >= 2) return stateRed;
    return stateBlue;
  };

  const getClientCState = () => {
    if (phase >= 6) return stateGreen;
    if (phase >= 5) return stateRed;
    if (phase >= 4) return stateRed;
    return null;
  };

  const showPacketAB = phase === 1 || phase === 5 || phase === 8;
  const packetABColor = phase === 1 ? "#f43f5e" : phase === 5 ? "#10b981" : "#6366f1";
  const showPacketC_Init = phase === 3;
  const showPacketC_Update = phase === 5;

  return (
    <div className="relative w-full h-72 select-none">
      {/* SVG Layer - lines + dots, using same % coordinates as the nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Server to Client A */}
        <line
          x1={`${SERVER_BOTTOM.x}%`}
          y1={`${SERVER_BOTTOM.y}%`}
          x2={`${CLIENT_A_TOP.x}%`}
          y2={`${CLIENT_A_TOP.y}%`}
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        {/* Server to Client B */}
        <line
          x1={`${SERVER_BOTTOM.x}%`}
          y1={`${SERVER_BOTTOM.y}%`}
          x2={`${CLIENT_B_TOP.x}%`}
          y2={`${CLIENT_B_TOP.y}%`}
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        {/* Server to Client C (conditional) */}
        {phase >= 3 && phase <= 7 && (
          <motion.line
            x1={`${SERVER_BOTTOM.x}%`}
            y1={`${SERVER_BOTTOM.y}%`}
            x2={`${CLIENT_C_TOP.x}%`}
            y2={`${CLIENT_C_TOP.y}%`}
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="6 6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Animated packets */}
        <AnimatePresence>
          {showPacketAB && (
            <React.Fragment key={`pkt-ab-${phase}`}>
              <motion.circle
                r="5"
                fill={packetABColor}
                initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
                animate={{ cx: `${CLIENT_A_TOP.x}%`, cy: `${CLIENT_A_TOP.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
              />
              <motion.circle
                r="5"
                fill={packetABColor}
                initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
                animate={{ cx: `${CLIENT_B_TOP.x}%`, cy: `${CLIENT_B_TOP.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </React.Fragment>
          )}
          {showPacketC_Init && (
            <motion.circle
              key="pkt-c-init"
              r="5"
              fill="#f43f5e"
              initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
              animate={{ cx: `${CLIENT_C_TOP.x}%`, cy: `${CLIENT_C_TOP.y}%`, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
          {showPacketC_Update && !showPacketC_Init && (
            <motion.circle
              key="pkt-c-upd"
              r="5"
              fill="#10b981"
              initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
              animate={{ cx: `${CLIENT_C_TOP.x}%`, cy: `${CLIENT_C_TOP.y}%`, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* SERVER NODE - positioned at (SERVER.x%, SERVER.y%) */}
      <div
        className="absolute z-20 flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${SERVER.x}%`, top: `${SERVER.y}%` }}
      >
        <div className="px-3 py-1 bg-slate-800 rounded-full border border-indigo-500/50 text-[10px] font-bold text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          SERVER
        </div>
        <StateBar colors={getServerState()} />
      </div>

      {/* CLIENT A */}
      <div
        className="absolute z-10 flex flex-col items-center gap-2 -translate-x-1/2"
        style={{ left: `${CLIENT_A.x}%`, top: `${CLIENT_A.y}%` }}
      >
        <StateBar colors={getClientABState()} />
        <div className="text-[10px] text-slate-500 font-mono">Client A</div>
      </div>

      {/* CLIENT B */}
      <div
        className="absolute z-10 flex flex-col items-center gap-2 -translate-x-1/2"
        style={{ left: `${CLIENT_B.x}%`, top: `${CLIENT_B.y}%` }}
      >
        <StateBar colors={getClientABState()} />
        <div className="text-[10px] text-slate-500 font-mono">Client B</div>
      </div>

      {/* CLIENT C (Dynamic) */}
      <AnimatePresence>
        {phase >= 3 && phase <= 7 && (
          <motion.div
            className="absolute z-10 flex flex-col items-center gap-2"
            style={{ left: `${CLIENT_C.x}%`, top: `${CLIENT_C.y}%` }}
            initial={{ opacity: 0, scale: 0, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%" }}
          >
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-indigo-500/90 text-white text-[10px] px-2 py-1 rounded shadow-lg border border-indigo-400"
              >
                Late Join: Get State
              </motion.div>
            )}
            {getClientCState() ? (
              <StateBar colors={getClientCState()!} />
            ) : (
              <div className="h-[30px] w-[66px] flex items-center justify-center bg-slate-900/50 rounded border border-slate-700 border-dashed">
                <div className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-transparent animate-spin" />
              </div>
            )}
            <div className="text-[10px] text-indigo-400 font-bold font-mono">Client C</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
