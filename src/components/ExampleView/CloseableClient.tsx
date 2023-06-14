import { MMLWebRunnerClient } from "mml-web-runner";
import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useEffect, useState } from "react";

import { getIframeTargetWindow } from "@/src/util/iframe-target";

function Container(props: { refProp: React.Ref<HTMLDivElement> }) {
  return (
    <div
      style={{
        position: "absolute",
        height: "calc(100% - 35px)",
        top: 35,
        width: "100%",
        overflow: "hidden",
      }}
      className="ClientContainer"
      ref={props.refProp}
    />
  );
}

export function CloseableClient(props: { document: NetworkedDOM | EditableNetworkedDOM }) {
  const [client, setClient] = useState<MMLWebRunnerClient | null>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

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
    <>
      <div className="h-[35px] w-full border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
        <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
          DEMO
        </span>{" "}
      </div>
      <Container refProp={elementRef} />
    </>
  );
}
