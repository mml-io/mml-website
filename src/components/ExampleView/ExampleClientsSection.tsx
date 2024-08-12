import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import * as React from "react";
import { useRef } from "react";

import { ExampleAvatarClient } from "@/src/components/ExampleView/ExampleAvatarClient";
import { ExampleFloatingClient } from "@/src/components/ExampleView/ExampleFloatingClient";
import { LocalAvatarServer } from "@/src/components/ExampleView/LocalAvatar/LocalAvatarServer";
import { CLIENT_TYPES, ClientType } from "@/types/docs-reference";

type ExampleClientsSectionProps = {
  clients: { type: ClientType; id: number }[];
  removeClient?: (index: number) => void;
  networkedDOMDocument: EditableNetworkedDOM | null;
  sectionWidth?: string;
  baseScene?: boolean;
  hideButtons?: boolean;
};

export default function ExampleClientsSection({
  clients,
  removeClient,
  networkedDOMDocument,
  sectionWidth = "50%",
  baseScene,
  hideButtons,
}: ExampleClientsSectionProps) {
  const server = useRef(new LocalAvatarServer());

  // Determine the number of columns and rows based on the number of clients
  const rows = clients.length < 3 ? 1 : 2; // We want one or two clients per row
  const columns = Math.min(clients.length, 2); // Calculate the number of rows needed

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`, // Create as many columns as needed
    gridTemplateRows: `repeat(${rows}, 1fr)`, // Create as many rows as needed
    height: "100%",
    width: "100%",
  };

  return (
    <div className={`relative flex h-[50%] md:h-full w-[${sectionWidth}] flex-[0_0_${sectionWidth}] flex-col`}>
      {networkedDOMDocument && (
        <div style={gridStyle}>
          {clients.map(({ type, id }, index) => {
            const children = hideButtons ? null : (
              <button
                className="absolute right-0 top-0 z-10 mr-1 mt-1 rounded border-[1px] border-editor-border bg-editor-bg px-[10px] py-[3px] text-[13px] text-white opacity-50 hover:opacity-100 dark:border-editor-border-dark"
                onClick={() => removeClient?.(id)}
              >
                X
              </button>
            );

            const avatarPositionForIndex = {
              x: [0, 2].includes(index) ? -1 : 1,
              y: 0.5,
              z: [0, 1].includes(index) ? 5 : 7,
            };

            return type === CLIENT_TYPES.FLOATING ? (
              <ExampleFloatingClient
                clientId={id}
                key={id}
                document={networkedDOMDocument}
                children={children}
                baseScene={baseScene}
              />
            ) : (
              <ExampleAvatarClient
                clientId={id}
                key={id}
                server={server.current}
                document={networkedDOMDocument}
                position={avatarPositionForIndex}
                rotation={{ x: 0, y: Math.PI, z: 0 }}
                children={children}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
