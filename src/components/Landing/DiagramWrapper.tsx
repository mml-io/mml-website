import React from "react";

type DiagramWrapperProps = {
  title: string;
  description: string;
  step?: number;
  children: React.ReactNode;
};

export const DiagramWrapper: React.FC<DiagramWrapperProps> = ({
  title,
  description,
  step,
  children,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between p-8 mt-8 first:mt-0 bg-white/60 dark:bg-slate-800/50 rounded-2xl border border-black/5 dark:border-slate-700/50 backdrop-blur-sm shadow-xl">
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="flex items-center gap-4">
          {step !== undefined && (
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-mml-500/10 dark:bg-mml-500/20 border border-mml-500/30 flex items-center justify-center text-mml-600 dark:text-mml-400 font-bold text-sm">
              {step}
            </span>
          )}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-secondary dark:text-slate-300 leading-relaxed text-lg">{description}</p>
      </div>
      <div className="flex-1 w-full flex justify-center items-center min-h-[300px] bg-slate-900 rounded-xl p-4 border border-slate-700/30 shadow-inner overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {children}
      </div>
    </div>
  );
};
