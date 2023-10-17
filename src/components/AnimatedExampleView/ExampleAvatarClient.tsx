import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useEffect, useState } from "react";
import { Euler, Vector3 } from "three";

import { getIframeTargetWindow } from "@/src/util/iframe-target";

import { LocalAvatarClient } from "./LocalAvatar/LocalAvatarClient";
import { LocalAvatarServer } from "./LocalAvatar/LocalAvatarServer";

function Container(props: { refProp: React.Ref<HTMLDivElement> }) {
  return <div className={"h-[100%]"} ref={props.refProp} />;
}

export const ExampleAvatarClient = React.memo(function ExampleAvatarClient(props: {
  server: LocalAvatarServer;
  document: NetworkedDOM | EditableNetworkedDOM;
  clientId: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}) {
  const [client, setClient] = useState<LocalAvatarClient | null>(null);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let runnerClient: LocalAvatarClient | null = null;
    getIframeTargetWindow().then((wrapper) => {
      if (disposed) {
        return;
      }
      runnerClient = new LocalAvatarClient(
        props.server,
        props.clientId,
        new Vector3(props.position.x, props.position.y, props.position.z),
        new Euler(props.rotation.x, props.rotation.y, props.rotation.z),
      );
      runnerClient.update();
      runnerClient.addDocument(props.document, wrapper.iframeWindow, wrapper.iframeBody);
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
    if (elementRef.current && client) {
      elementRef.current.appendChild(client.element);
    }
  }, [elementRef.current, client]);

  if (!client) {
    return null;
  }

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
