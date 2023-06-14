import { MMLWebRunnerClient } from "mml-web-runner";
import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useEffect, useState } from "react";

import { getIframeTargetWindow } from "@/src/util/iframe-target";


  return (
    <div






      }}



  );
}


  const [client, setClient] = useState<MMLWebRunnerClient | null>(null);


  useEffect(() => {
    const windowTarget = getIframeTargetWindow();
    const remoteHolderElement = windowTarget.document.body;
    const runnerClient = new MMLWebRunnerClient(windowTarget, remoteHolderElement);
    runnerClient.connect(props.document);
    setClient(runnerClient);
    return () => {
      runnerClient.dispose();
    };
  }, []);







  setTimeout(() => {
    client?.fitContainer();
  }, 1);





  return (








  );
}
