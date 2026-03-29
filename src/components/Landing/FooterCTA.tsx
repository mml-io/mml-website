import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";

export default function FooterCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-900 dark:bg-slate-950">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mml-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px]" />
      </div>
      <div className="relative z-10 container max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to get started?</h2>
        <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto">
          Join developers building the open metaverse with MML.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs/guides/get-started"
            className="px-7 py-3.5 bg-mml-500 text-white rounded-full font-semibold hover:bg-mml-400 transition-all shadow-xl shadow-mml-500/25 hover:shadow-mml-400/30 inline-flex items-center justify-center gap-2"
          >
            Start Building Now
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
          <a
            href="https://discord.gg/hPdWYhfVem"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/15 inline-flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faDiscord} className="h-4 w-4" />
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}
