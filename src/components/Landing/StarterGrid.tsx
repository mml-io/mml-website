import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as React from "react";

import { examples } from "@/src/content/examples";

export default function StarterGrid() {
  const entries = Object.entries(examples).slice(0, 6);
  return (
    <section className="py-24 bg-slate-50 dark:bg-transparent border-y border-black/5 dark:border-white/5">
      <div className="container">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Jumpstart with templates</h2>
            <p className="mt-2 text-secondary dark:text-slate-400 text-lg">
              Explore interactive examples you can remix and deploy.
            </p>
          </div>
          <Link href="/examples" className="btn-ghost shrink-0">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(([id, ex]) => (
            <Link
              key={id}
              href={`/examples?example=${id}`}
              className="group rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-mml-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={ex.image}
                  alt={ex.name}
                  className="absolute inset-0 w-full h-full object-cover dark:brightness-90 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-mml-600/0 group-hover:bg-mml-600/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-slate-900 dark:text-white shadow-lg flex items-center gap-2">
                    Try it
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-black/5 dark:border-white/5">
                <h3 className="font-semibold">{ex.name}</h3>
                <p className="text-secondary dark:text-slate-400 text-sm mt-1">{ex.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
