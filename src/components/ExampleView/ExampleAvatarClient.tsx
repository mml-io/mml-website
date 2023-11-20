import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useEffect, useState } from "react";
import { Euler, Vector3 } from "three";

import ExampleClientView from "@/src/components/ExampleView/ExampleClientView";
import { getIframeTargetWindow } from "@/src/util/iframe-target";

import { LocalAvatarClient } from "../AnimatedExampleView/LocalAvatar/LocalAvatarClient";
import { LocalAvatarServer } from "../AnimatedExampleView/LocalAvatar/LocalAvatarServer";

export const ExampleAvatarClient = React.memo(function ExampleAvatarClient(props: {
  server: LocalAvatarServer;
  document: NetworkedDOM | EditableNetworkedDOM;
  clientId: number;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  children?: React.ReactNode;
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
      client.element.setAttribute("style", "height: 100%");
      elementRef.current.appendChild(client.element);
    }
  }, [elementRef.current, client]);

  if (!client) {
    return null;
  }

  return <ExampleClientView elementRef={elementRef}>{props.children}</ExampleClientView>;
});
