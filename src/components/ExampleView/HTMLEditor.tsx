

import * as React from "react";




























  const { code, setCode } = props;


  return (
    <MonacoEditor


      defaultLanguage="html"
      options={{ wordWrap: "on" }}
      value={code}
      onChange={(e) => {
        setCode(e || "");
      }}
    />
  );
}
