import { LoadingScreen, LoadingScreenConfig, SpawnConfigurationState } from "@mml-io/3d-web-client-core";
import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import ExampleClientView from "@/src/components/ExampleView/ExampleClientView";
import { getIframeTargetWindow } from "@/src/util/iframe-target";

import { LocalAvatarClient } from "./LocalAvatar/LocalAvatarClient";
import { LocalAvatarServer } from "./LocalAvatar/LocalAvatarServer";

export const ExampleAvatarClient = React.memo(function ExampleAvatarClient(props: {
  server: LocalAvatarServer;
  document: NetworkedDOM | EditableNetworkedDOM;
  clientId: number;
  spawnConfiguration: SpawnConfigurationState;
  username?: string;
  loadingScreenConfig?: LoadingScreenConfig;
  children?: React.ReactNode;
}) {
  const [client, setClient] = useState<LocalAvatarClient | null>(null);
  const loadingScreenRef = useRef<LoadingScreen | null>(null);
  const loadingContainerRef = useRef<HTMLDivElement | null>(null);

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
        props.spawnConfiguration,
        wrapper.iframeWindow,
        wrapper.iframeBody,
        props.username,
      );
      runnerClient.update();

      // Create the LoadingScreen BEFORE addDocument/setInitialLoadComplete
      // so its callback is registered before any progress events fire.
      if (loadingContainerRef.current) {
        const loadingScreen = new LoadingScreen(
          runnerClient.loadingProgressManager as any,
          props.loadingScreenConfig,
        );
        loadingContainerRef.current.appendChild(loadingScreen.element);
        loadingScreenRef.current = loadingScreen;
      }

      runnerClient.addDocument(props.document, wrapper.iframeWindow, wrapper.iframeBody);
      runnerClient.setInitialLoadComplete();
      setClient(runnerClient);
    });

    return () => {
      disposed = true;
      if (loadingScreenRef.current) {
        loadingScreenRef.current.dispose();
        loadingScreenRef.current = null;
      }
      if (runnerClient) {
        runnerClient.dispose();
      }
    };
  }, []);

  const attachRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && client) {
        client.element.setAttribute("style", "height: 100%");
        node.appendChild(client.element);
      }
    },
    [client],
  );

  return (
    <ExampleClientView onLoad={() => {}} elementRef={attachRef}>
      <div
        ref={loadingContainerRef}
        className="absolute inset-0 z-50 pointer-events-none"
      />
      {props.children}
    </ExampleClientView>
  );
});
