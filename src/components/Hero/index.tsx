import * as React from "react";
import { useEffect, useState } from "react";

import HomepageLinkCollection from "../HomepageLinkCollection";

function useAspectRatio() {
  if (typeof window === "undefined") {
    return 1;
  }
  const getAspectRatio = () => window.innerWidth / window.innerHeight;
  const [aspectRatio, setAspectRatio] = useState(getAspectRatio);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(getAspectRatio());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return aspectRatio;
}

const Hero = () => {
  const aspectRatio = useAspectRatio();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const videoSrc =
    aspectRatio > 1 ? "/videos/mml-website-landscape.mp4" : "/videos/mml-website-portrait.mp4";

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        {mounted ? (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            playsInline
            muted
          ></video>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-grey"></div>
        )}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
          <div className="relative">
            <img
              src="/images/hero/animated-mml-logo.svg"
              alt="MML Logo"
              className="w-48 md:w-64 lg:w-96 mix-blend-difference"
            />
            <img
              src="/images/hero/animated-mml-logo.svg"
              alt="MML Logo"
              className="absolute top-0 left-0 w-48 md:w-64 lg:w-96 opacity-50"
            />
          </div>
          <div className="relative">
            <h1
              className="font-neue-metana-bold text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-white mb-2 p-4 mix-blend-difference"
              aria-hidden="true"
            >
              Metaverse
              <br />
              Markup
              <br />
              Language
            </h1>
            <h1 className="absolute top-0 left-0 z-10 font-neue-metana-bold text-4xl sm:text-6xl md:text-7xl xl:text-8xl text-white opacity-50 mb-2 p-4">
              Metaverse
              <br />
              Markup
              <br />
              Language
            </h1>
          </div>
          <p className="text-xl !leading-[1.75rem] md:text-2xl md:!leading-[2rem] lg:text-3xl lg:!leading-[2.5rem]  text-[#ffffffbb] p-4 pt-0">
            <b>Open-Source</b> Web Technologies for
            <br />
            Building Multi-user Metaverse Experiences
            <br />
            using <b>HTML</b> and <b>JavaScript</b>
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full pb-8">
          <HomepageLinkCollection />
        </div>
      </div>
    </>
  );
};

export default Hero;
