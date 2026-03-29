import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const MarkupToWorldDiagram: React.FC = () => {
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const sequence = async () => {
      while (!cancelled) {
        setTextStage(0);
        await wait(1000);
        if (cancelled) break;
        setTextStage(1);
        await wait(1500);
        if (cancelled) break;
        setTextStage(2);
        await wait(1000);
        if (cancelled) break;
        setTextStage(3);
        await wait(1500);
        if (cancelled) break;
        setTextStage(4);
        await wait(2000);
        if (cancelled) break;
        setTextStage(5);
        await wait(1000);
      }
    };
    sequence();
    return () => {
      cancelled = true;
    };
  }, []);

  const showColorAttr = textStage >= 1;
  const colorAttrComplete = textStage >= 2;
  const showScaleAttr = textStage >= 3;
  const scaleAttrComplete = textStage >= 4;

  return (
    <div className="flex items-center gap-8 w-full max-w-xl justify-center p-4">
      {/* CODE EDITOR */}
      <div className="w-56 h-48 bg-slate-950 rounded-lg border border-slate-800 p-5 font-mono text-sm leading-relaxed shadow-2xl relative overflow-hidden flex flex-col justify-center">
        <div className="absolute top-3 left-3 flex gap-1.5 opacity-50">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        </div>

        <div className="text-slate-500 mt-4">&lt;m-group&gt;</div>

        <div className="pl-4 text-slate-300">
          <div>&lt;m-cube</div>

          <div className="h-6 flex items-center">
            {showColorAttr && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ duration: 1, ease: "linear" }}
                className="overflow-hidden whitespace-nowrap flex gap-1"
              >
                <span className="text-purple-400">color</span>
                <span>=</span>
                <span className="text-amber-300">&quot;red&quot;</span>
              </motion.div>
            )}
          </div>

          <div className="h-6 flex items-center">
            {showScaleAttr && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                transition={{ duration: 1, ease: "linear" }}
                className="overflow-hidden whitespace-nowrap flex gap-1"
              >
                <span className="text-purple-400">sy</span>
                <span>=</span>
                <span className="text-blue-300">&quot;1.5&quot;</span>
              </motion.div>
            )}
          </div>

          <div>/&gt;</div>
        </div>

        <div className="text-slate-500">&lt;/m-group&gt;</div>
      </div>

      {/* ARROW */}
      <div className="text-slate-700">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* 3D PREVIEW */}
      <div className="w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden shadow-inner">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <motion.div
          className="w-16 h-16 bg-white/10 border-2 relative backdrop-blur-sm"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: 15,
            rotateY: 360,
            backgroundColor: colorAttrComplete
              ? "rgba(244, 63, 94, 0.5)"
              : "rgba(255, 255, 255, 0.1)",
            borderColor: colorAttrComplete ? "#f43f5e" : "#e2e8f0",
            scaleY: scaleAttrComplete ? 1.5 : 1,
          }}
          transition={{
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
            backgroundColor: { duration: 0.3 },
            borderColor: { duration: 0.3 },
            scaleY: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          <div className="absolute inset-2 border border-white/20 opacity-50" />
        </motion.div>
      </div>
    </div>
  );
};
