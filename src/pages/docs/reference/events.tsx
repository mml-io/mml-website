import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";
import EventsTable from "@/src/components/EventsTable";

const DocsPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Events"
        parents={[
          { name: "Docs", path: "docs" },
          { name: "Reference", path: "reference" },
        ]}
      />
      <main className="mx-auto max-w-screen-xl px-5 xl:p-0">
        <EventsTable />
      </main>
    </>
  );
};

export default DocsPage;
