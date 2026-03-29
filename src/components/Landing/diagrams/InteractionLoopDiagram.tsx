import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Switch = ({
  on,
  highlightColor,
  label,
}: {
  on: boolean;
  highlightColor?: "yellow" | "blue";
  label: string;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`
      relative flex items-center justify-center transition-all duration-300 shadow-lg
      w-14 h-16 rounded-xl border-4
      ${
        highlightColor === "yellow"
          ? "bg-yellow-500/20 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]"
          : highlightColor === "blue"
            ? "bg-indigo-500/20 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            : "bg-slate-800 border-slate-700"
      }
    `}
    >
      <div
        className={`
            w-5 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${on ? "bg-indigo-500 border-indigo-400" : "bg-slate-700 border-slate-600"}
        `}
      >
        <div
          className={`
                w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-all duration-300
                ${on ? "-translate-y-2" : "translate-y-2"}
             `}
        />
      </div>
    </div>
    <span
      className={`text-[10px] font-mono font-bold uppercase tracking-widest transition-colors duration-300
        ${highlightColor === "yellow" ? "text-yellow-400" : highlightColor === "blue" ? "text-indigo-300" : "text-slate-400"}
    `}
    >
      {label}
    </span>
  </div>
);

const FlowStatus = ({
  label,
  active,
  activeColor,
}: {
  label: string;
  active: boolean;
  activeColor?: string;
}) => (
  <motion.div
    animate={{
      opacity: active ? 1 : 0.2,
      scale: active ? 1.05 : 1,
      color: active ? activeColor || "#fff" : "#94a3b8",
    }}
    className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded"
  >
    {label}
  </motion.div>
);

// All positions as percentages
const SERVER = { x: 50, y: 10 };
const SERVER_BOTTOM = { x: 50, y: 20 };
const USER_A = { x: 22, y: 76 };
const USER_A_TOP = { x: 22, y: 75 };
const USER_B = { x: 78, y: 76 };
const USER_B_TOP = { x: 78, y: 75 };

export const InteractionLoopDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const times = [1000, 500, 800, 1200, 800, 1500];
    let currentStep = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const nextStep = () => {
      currentStep = (currentStep + 1) % times.length;
      setStep(currentStep);
      timeoutId = setTimeout(nextStep, times[currentStep]);
    };

    timeoutId = setTimeout(nextStep, times[0]);
    return () => clearTimeout(timeoutId);
  }, []);

  const isClick = step === 1;
  const isPacketUp = step === 2;
  const isLogic = step === 3;
  const isPacketDown = step === 4;
  const isUpdate = step === 5;

  const highlightInteraction = isClick || isPacketUp;
  const highlightLogic = isLogic;
  const highlightBroadcast = isPacketDown || isUpdate;

  const switchesOn = isUpdate;

  let userA_HighlightColor: "yellow" | "blue" | undefined;
  if (highlightInteraction) userA_HighlightColor = "yellow";
  else if (highlightBroadcast) userA_HighlightColor = "blue";

  const userB_HighlightColor: "yellow" | "blue" | undefined = highlightBroadcast
    ? "blue"
    : undefined;

  const server_HighlightType = highlightLogic ? "logic" : highlightBroadcast ? "broadcast" : "none";

  return (
    <div className="relative w-full h-[360px] select-none overflow-hidden bg-slate-900/20 rounded-xl">
      {/* SVG Layer - wires + packets, using same % coordinates as nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Wire: User A to Server */}
        <line
          x1={`${USER_A_TOP.x}%`}
          y1={`${USER_A_TOP.y}%`}
          x2={`${SERVER_BOTTOM.x}%`}
          y2={`${SERVER_BOTTOM.y}%`}
          stroke="#334155"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
        {/* Wire: User B to Server */}
        <line
          x1={`${USER_B_TOP.x}%`}
          y1={`${USER_B_TOP.y}%`}
          x2={`${SERVER_BOTTOM.x}%`}
          y2={`${SERVER_BOTTOM.y}%`}
          stroke="#334155"
          strokeWidth="3"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Animated packets */}
        <AnimatePresence>
          {isPacketUp && (
            <motion.circle
              key="pkt-up"
              r="6"
              fill="#facc15"
              initial={{ cx: `${USER_A_TOP.x}%`, cy: `${USER_A_TOP.y}%`, opacity: 0 }}
              animate={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          )}
          {isPacketDown && (
            <>
              <motion.circle
                key="pkt-down-a"
                r="6"
                fill="#818cf8"
                initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
                animate={{ cx: `${USER_A_TOP.x}%`, cy: `${USER_A_TOP.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.circle
                key="pkt-down-b"
                r="6"
                fill="#818cf8"
                initial={{ cx: `${SERVER_BOTTOM.x}%`, cy: `${SERVER_BOTTOM.y}%`, opacity: 0 }}
                animate={{ cx: `${USER_B_TOP.x}%`, cy: `${USER_B_TOP.y}%`, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>

      {/* SERVER NODE */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${SERVER.x}%`, top: `${SERVER.y}%` }}
      >
        <motion.div
          className="p-1 rounded-2xl"
          animate={{
            backgroundColor:
              server_HighlightType === "logic"
                ? "rgba(244, 63, 94, 0.2)"
                : server_HighlightType === "broadcast"
                  ? "rgba(99, 102, 241, 0.2)"
                  : "rgba(0, 0, 0, 0)",
          }}
        >
          <div
            className={`
                w-28 h-14 bg-slate-900 rounded-xl border-2 flex items-center justify-center shadow-xl relative overflow-hidden transition-all duration-300
                ${server_HighlightType === "logic" ? "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.4)]" : ""}
                ${server_HighlightType === "broadcast" ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]" : ""}
                ${server_HighlightType === "none" ? "border-slate-600" : ""}
            `}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                animate={{ opacity: server_HighlightType === "logic" ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`text-[10px] font-bold font-mono uppercase tracking-widest ${server_HighlightType === "broadcast" ? "text-indigo-400" : "text-slate-500"}`}
                >
                  Server
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900"
                animate={{ opacity: server_HighlightType === "logic" ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse absolute top-2 right-2" />
                <span className="text-[10px] text-rose-400 font-bold font-mono uppercase tracking-widest">
                  Logic
                </span>
                <span className="text-[8px] text-slate-500 font-mono">Running...</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flow Status - centered in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="bg-slate-900/90 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-md shadow-2xl flex items-center gap-3">
          <FlowStatus label="Interaction" active={highlightInteraction} activeColor="#facc15" />
          <div className="w-4 h-[1px] bg-slate-700" />
          <FlowStatus label="Logic" active={highlightLogic} activeColor="#fb7185" />
          <div className="w-4 h-[1px] bg-slate-700" />
          <FlowStatus label="Broadcast" active={highlightBroadcast} activeColor="#818cf8" />
        </div>
      </div>

      {/* USER A */}
      <div
        className="absolute z-20 -translate-x-1/2"
        style={{ left: `${USER_A.x}%`, top: `${USER_A.y}%` }}
      >
        <div className="relative">
          <AnimatePresence>
            {isClick && (
              <>
                <motion.div
                  key="finger"
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 left-4 text-2xl z-50 pointer-events-none drop-shadow-2xl"
                >
                  {"\u{1F446}"}
                </motion.div>
                <motion.div
                  key="ripple"
                  initial={{ opacity: 0.5, scale: 0 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-500/30 rounded-full"
                />
              </>
            )}
          </AnimatePresence>
          <Switch on={switchesOn} highlightColor={userA_HighlightColor} label="User A" />
        </div>
      </div>

      {/* USER B */}
      <div
        className="absolute z-20 -translate-x-1/2"
        style={{ left: `${USER_B.x}%`, top: `${USER_B.y}%` }}
      >
        <Switch on={switchesOn} highlightColor={userB_HighlightColor} label="User B" />
      </div>
    </div>
  );
};
