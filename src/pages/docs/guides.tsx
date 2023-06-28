import Head from "next/head";
import * as React from "react";

import GuidesList from "@/src/components/GuidesList";

const GuidesPage = () => {
  return (
    <>
      <Head>
        <title>Docs - Reference - MML</title>
      </Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <GuidesList />
      </main>
    </>
  );
};

export default GuidesPage;
