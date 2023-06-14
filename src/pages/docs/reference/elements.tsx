import Head from "next/head";
import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import ElementsTable from "@/src/components/ElementsTable";

const DocsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Elements"
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Reference", path: "reference" },
        ]}
      />
      <Head>
        <title>Elements - MML</title>
      </Head>
      <main className="mx-auto max-w-screen-xl px-5 xl:p-0">
        <ElementsTable />
      </main>
    </>
  );
};

export default DocsPage;
