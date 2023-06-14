import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import { MMLWebRunnerClient } from "mml-web-runner";
import * as React from "react";
import { useEffect, useState } from "react";

import { getIframeTargetWindow } from "@/src/util/iframe-target";

function Container(props: { refProp: React.Ref<HTMLDivElement> }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 148,
        width: "100%",
        overflow: "hidden",
      }}
      className="ClientContainer"
      ref={props.refProp}
    />
  );
}

export const ExampleClient = React.memo(function CloseableClient(props: {
  document: NetworkedDOM | EditableNetworkedDOM;
  clientId: number;
}) {
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

  if (!client) {
    return null;
  }

  setTimeout(() => {
    client?.fitContainer();
  }, 1);
  return (
    <div className="relative h-[50%] w-[50%] border-s-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
      <div className="h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
        <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
          Client {props.clientId + 1}
        </span>{" "}
      </div>
      <Container refProp={elementRef} />
    </div>
  );
});
