import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";

import HeroBackground from "./hero-background";

const AnimatedExampleView = dynamic(
  () =>
    import("@/src/components/AnimatedExampleView/AnimatedExampleView").then(
      (mod) => mod.AnimatedExampleView,
    ),
  { ssr: false },
);

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pt-[120px] md:pt-[150px] xl:pt-[180px]"
      >
        <div className="container">
          <HeroBackground />
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
                <h1 className="mb-5 mt-10 text-[40px] font-medium leading-[52px] text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight xl:mt-0">
                  Metaverse Markup Language
                </h1>
                <p className="mb-12 whitespace-pre-line text-base font-normal !leading-relaxed text-black dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  {`Create interactive, portable, multi-user 3D experiences and objects
                  with powerful and familiar HTML and JavaScript`}
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://github.com/mml-io/mml"
                    className="w-48 bg-white px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out
hover:bg-white/30 dark:bg-[#1F2931] dark:text-white dark:hover:bg-[#1F2931]/30"
                  >
                    View on GitHub
                  </Link>
                  <Link
                    href="/examples"
                    className="w-48 bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <AnimatedExampleView />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
