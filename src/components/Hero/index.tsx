import * as React from "react";

import HomepageLinkCollection from "../HomepageLinkCollection";

const Hero = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/videos/mml-reel.mp4"
          autoPlay
          loop
          muted
        ></video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 text-center">
          <img
            src="/images/hero/animated-mml-logo.svg"
            alt="MML Logo"
            className="w-48 md:w-64 lg:w-96"
          />
          <h1 className="text-4xl md:text-6xl lg:text-16xl text-white font-bold mb-2 p-4 text-[#ffffffbb]">
            Metaverse Markup Language
          </h1>
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
