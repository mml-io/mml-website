import Head from "next/head";
import * as React from "react";

import AboutSectionOne from "@/src/components/About/AboutSectionOne";
import AboutSectionTwo from "@/src/components/About/AboutSectionTwo";
import Brands from "@/src/components/Brands";
import ScrollUp from "@/src/components/Common/ScrollUp";
import Features from "@/src/components/Features";
import Hero from "@/src/components/Hero";
import Examples from "@/src/components/ProjectExamples";

export default function Home() {
  return (
    <>
      <Head>
        <title>Metaverse Markup Language</title>
      </Head>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Examples />
      <Brands />
    </>
  );
}
