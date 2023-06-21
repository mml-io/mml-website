import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import { MMLWebRunnerClient } from "mml-web-runner";
import * as React from "react";
import { useEffect, useState } from "react";

import { getIframeTargetWindow } from "@/src/util/iframe-target";

function Container(props: { refProp: React.Ref<HTMLDivElement> }) {
  return (
    <div
      style={{
        height: "calc(100% - 35px)",
      }}
      className="ClientContainer w-full overflow-hidden"
      ref={props.refProp}
    />
  );
}

export function CloseableClient(props: { document: NetworkedDOM | EditableNetworkedDOM }) {
  const [client, setClient] = useState<MMLWebRunnerClient | null>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let runnerClient: MMLWebRunnerClient | null = null;
    getIframeTargetWindow().then((wrapper) => {
      if (disposed) {
        return;
      }
      runnerClient = new MMLWebRunnerClient(wrapper.iframeWindow, wrapper.iframeBody);
      runnerClient.connect(props.document);
      setClient(runnerClient);
    });

    return () => {
      disposed = true;
      if (runnerClient) {
        runnerClient.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.appendChild(client.element);
    }
  }, [elementRef.current, client]);

  setTimeout(() => {
    client?.fitContainer();
  }, 1);

  if (!client) {
    return null;
  }

  return (
    <div className="flex-1">
      <div className="h-[35px] w-full border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
        <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
          DEMO
        </span>{" "}
      </div>
      <Container refProp={elementRef} />
    </div>
  );
}
