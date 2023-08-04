import Head from "next/head";
import * as React from "react";

import ElementsTable from "@/src/components/ElementsTable";
import { getPageTitle } from "@/src/util";

const DocsPage = () => {
  return (
    <>
      <Head>{getPageTitle("Elements")}</Head>
      <main className="mx-auto mt-32 max-w-[450px] px-4 sm:max-w-[575px] sm:px-0 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1300px]">
        <ElementsTable />
      </main>
    </>
  );
};

export default DocsPage;
