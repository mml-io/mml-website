import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faCode,
  faCodeBranch,
  faCompass,
  faCubes,
  faGlobe,
  faHammer,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

function useIsPortrait() {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const check = () => setPortrait(window.innerWidth / window.innerHeight < 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return portrait;
}

type FeatureCard = {
  title: string;
  description: string;
  href: string;
  icon: IconDefinition;
  external?: boolean;
};

const featureCards: FeatureCard[] = [
  {
    title: "MML Language",
    description:
      "The markup language for interactive 3D. HTML-like tags, server-authoritative DOM.",
    href: "/docs",
    icon: faCubes,
  },
  {
    title: "3D Web Experience",
    description:
      "A ready-to-deploy framework for multi-user 3D worlds with avatars, chat, and networking.",
    href: "/3d-web-experience",
    icon: faGlobe,
  },
  {
    title: "Live Examples",
    description: "Interactive demos you can explore, edit, and remix in the browser.",
    href: "/examples",
    icon: faCode,
  },
  {
    title: "Open Source",
    description: "MIT-licensed libraries on GitHub.",
    href: "https://github.com/mml-io",
    icon: faCodeBranch,
    external: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Hero() {
  const isPortrait = useIsPortrait();
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-12 md:pb-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-black/40 dark:bg-slate-950/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-light-theme dark:from-slate-950 via-transparent to-transparent z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90 dark:opacity-80 scale-105"
          src={isPortrait ? "/videos/mml-website-portrait.mp4" : "/videos/mml-website-landscape.mp4"}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container pt-32 md:pt-40 lg:pt-48 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-mml-500/20 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-mml-500/30 mb-6 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-mml-400 animate-pulse" />
            Open Source &bull; Real-time &bull; Multi-user
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl"
          >
            Metaverse <br />
            <span className="[filter:drop-shadow(0_0_60px_rgba(14,165,233,0.3))]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mml-300 to-indigo-400">
                Markup Language
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-white/90 font-light mb-8 leading-relaxed drop-shadow-md max-w-xl"
          >
            Open source tools for building interactive, multi-user 3D experiences on the web.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-3 mb-6"
          >
            <Link
              href="/docs/guides/get-started"
              className="inline-flex items-center gap-2 px-6 py-3 bg-mml-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-mml-500/25 hover:bg-mml-400 hover:scale-105 hover:shadow-mml-400/30"
            >
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <a
              href="https://guided-tour-9709e5_world-7599b2.mml.world"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-full transition-all border border-slate-600"
            >
              <FontAwesomeIcon icon={faPlay} className="h-3 w-3" />
              Play the Guided Tour
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-2 mb-16"
          >
            {[
              { name: "GitHub", href: "https://github.com/mml-io", icon: faGithub },
              { name: "Discord", href: "https://discord.gg/hPdWYhfVem", icon: faDiscord },
              { name: "MML Editor", href: "https://mmleditor.com", icon: faHammer },
              { name: "Explore Creations", href: "https://mmleditor.com/explore", icon: faCompass },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
              >
                <FontAwesomeIcon icon={link.icon} className="h-3 w-3" />
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-auto">
          {featureCards.map((card, index) => {
            const CardTag = card.external ? "a" : Link;
            const extraProps = card.external ? { target: "_blank", rel: "noreferrer" } : {};
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5 + index}
              >
                <CardTag
                  href={card.href}
                  {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                  className="group relative bg-white/80 dark:bg-slate-900/70 hover:bg-white/90 dark:hover:bg-slate-800/90 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:border-mml-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer text-left overflow-hidden hover:-translate-y-1 shadow-xl block h-full"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-mml-500/10 dark:bg-mml-500/20 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={card.icon}
                            className="h-3.5 w-3.5 text-mml-600 dark:text-mml-400"
                          />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-mml-600 dark:group-hover:text-mml-300 transition-colors">
                          {card.title}
                        </h2>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="h-4 w-4 text-mml-500 dark:text-mml-400"
                        />
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mml-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </CardTag>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
