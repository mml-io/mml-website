import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import { MMLScene } from "mml-web";
import { MMLWebRunnerClient } from "mml-web-runner";
import * as React from "react";
import { useEffect, useState } from "react";

import { getIframeTargetWindow } from "@/src/util/iframe-target";

function Container(props: { refProp: React.Ref<HTMLDivElement> }) {
  return <div className={"h-[100%] w-[100%]"} ref={props.refProp} />;
}

export const ExampleClient = React.memo(function ExampleClient(props: {
  document: NetworkedDOM | EditableNetworkedDOM;
  clientId: number;
}) {
  const [clientState, setClientState] = useState<{
    client: MMLWebRunnerClient;
    scene: MMLScene;
  } | null>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let runnerClient: MMLWebRunnerClient | null = null;
    let mmlScene: MMLScene | null = null;
    getIframeTargetWindow().then((wrapper) => {
      if (disposed) {
        return;
      }
      mmlScene = new MMLScene();
      runnerClient = new MMLWebRunnerClient(wrapper.iframeWindow, wrapper.iframeBody, mmlScene);
      runnerClient.connect(props.document);
      setClientState({ client: runnerClient, scene: mmlScene });
    });

    return () => {
      disposed = true;
      if (runnerClient) {
        runnerClient.dispose();
      }
      if (mmlScene) {
        mmlScene.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (elementRef.current && clientState) {
      elementRef.current.appendChild(clientState.scene.element);
    }
  }, [elementRef.current, clientState]);

  if (!clientState) {
    return null;
  }

  setTimeout(() => {
    clientState?.scene.fitContainer();
  }, 1);
  return (
    <>
      <div className="h-[35px] w-full border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
        <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
          Client {props.clientId + 1}
        </span>
      </div>
      <Container refProp={elementRef} />
    </>
  );
});
