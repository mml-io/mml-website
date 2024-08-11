import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons/faArrowRotateRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import { IframeObservableDOMFactory } from "@mml-io/networked-dom-web-runner";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import ExampleClientsSection from "@/src/components/ExampleView/ExampleClientsSection";
import HTMLEditor from "@/src/components/ExampleView/HTMLEditor";
import { getClientIdFunctionGenerator } from "@/src/util/clients-utils";
import { CLIENT_TYPES, ClientType } from "@/types/docs-reference";

const getNextClientId = getClientIdFunctionGenerator();

export type DocsExampleViewProps = {
  code: string;
  initialClients: ClientType[];
  baseScene?: boolean;
  description: string;
  noBorders?: boolean;
};

/**
 * DocsExampleView
 *
 * @param {DocsExampleViewProps} props - The props for the DocsExampleView component
 * @returns {JSX.Element} - The rendered JSX element
 */
export function DocsExampleView(props: DocsExampleViewProps) {
  const [clients, setClients] = useState<{ type: ClientType; id: number }[]>(() =>
    props.initialClients.map((type) => ({
      type,
      id: getNextClientId(),
    })),
  );

  const [code, setCode] = useState(props.code);
  const [networkedDOMDocument, setNetworkedDOMDocument] = useState<EditableNetworkedDOM | null>(
    null,
  );
  const [showAddButtons, setShowAddButtons] = useState(false);

  const { baseScene } = props;

  useEffect(() => {
    const document = new EditableNetworkedDOM(
      "http://example.com/index.html",
      IframeObservableDOMFactory,
      true,
    );
    document.load(code);
    setNetworkedDOMDocument(document);

    return () => {
      document.dispose();
    };
  }, []);

  useEffect(() => {
    networkedDOMDocument?.load(code);
  }, [code]);

  /**
   * Function handleResetClick
   *
   * @description Resets the code to the initial value
   *
   * @function
   * @returns {void}
   */
  const handleResetClick = useCallback(() => {
    setCode(props.code);
  }, []);

  const handlePlusButton = () => {
    if (clients.length >= 4) return;
    setShowAddButtons((prev) => !prev);
  };

  const addNewClient = (clientType: ClientType) => {
    if (clients.length >= 4) return;
    const newClient = {
      type: clientType,
      id: getNextClientId(),
    };
    setClients((oldClients) => [...oldClients, newClient]);
    setShowAddButtons(false);
  };

  const removeClient = (elemId: number) => {
    setClients((oldClients) => oldClients.filter(({ id }) => id !== elemId));
  };

  return (
    <div className="relative h-full overflow-hidden shadow-lg">
      <div
        className={twMerge(
          "relative flex h-[50px] justify-between overflow-hidden rounded-t border-b-0 border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white",
          !props.noBorders && "border-[1px] border-b-0",
        )}
      >
        {props.description}
        <div>
          <button
            onClick={handlePlusButton}
            className={twMerge("mr-2", clients.length >= 4 && "opacity-30")}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={handleResetClick}>
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </button>
        </div>
      </div>
      <div
        className={twMerge(
          "relative flex h-[calc(100%-50px)] flex-row overflow-hidden border-t-[1px] border-editor-border dark:border-editor-border-dark",
          !props.noBorders && "rounded-b border-[1px]",
        )}
      >
        <div
          className={twMerge(
            "h-full w-0 flex-[0_0_50%] border-editor-border dark:border-editor-border-dark",
            !props.noBorders && "border-r-[1px]",
          )}
        >
          <div className="flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
            <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
              CODE
            </span>
          </div>
          <HTMLEditor code={code} setCode={setCode} />
        </div>
        <ExampleClientsSection
          baseScene={baseScene}
          networkedDOMDocument={networkedDOMDocument}
          clients={clients}
          removeClient={removeClient}
        />
      </div>
      {showAddButtons && (
        <div className="absolute right-2 top-10 z-20 border-[1px] border-editor-border dark:border-editor-border-dark">
          <button
            className="block w-full bg-white px-[10px] py-[3px] text-[13px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white"
            onClick={() => addNewClient(CLIENT_TYPES.FLOATING)}
          >
            New client
          </button>
          <button
            className="block w-full border-t-[1px] border-editor-border bg-white px-[10px] py-[3px] text-[13px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white"
            onClick={() => addNewClient(CLIENT_TYPES.AVATAR)}
          >
            New Avatar client
          </button>
        </div>
      )}
    </div>
  );
}
