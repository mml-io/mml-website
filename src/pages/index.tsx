import Head from "next/head";
import * as React from "react";

import Brands from "@/src/components/Brands";
import ScrollUp from "@/src/components/Common/ScrollUp";
import Features from "@/src/components/Features";
import Hero from "@/src/components/Hero";
import HowItWorks from "@/src/components/HowItWorks";
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
      <HowItWorks />
      <Examples />
      <Brands />
    </>
  );
}
