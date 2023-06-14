import * as React from "react";

import Breadcrumb from "@/src/components/Common/Breadcrumb";


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


      </main>
    </>
  );
};

export default DocsPage;
