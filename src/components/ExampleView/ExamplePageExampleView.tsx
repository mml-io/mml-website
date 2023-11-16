import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import { IframeObservableDOMFactory } from "@mml-io/networked-dom-web-runner";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import ExampleClientsSection from "@/src/components/ExampleView/ExampleClientsSection";
import HTMLEditor from "@/src/components/ExampleView/HTMLEditor";
import { getClientIdFunctionGenerator } from "@/src/util/clients-utils";
import { CLIENT_TYPES, ClientType } from "@/types/docs-reference";

const getNextClientId = getClientIdFunctionGenerator();

export function ExamplePageExampleView(props: {
  code: string;
  initialClients?: ClientType[];
  baseScene: boolean;
  description: string;
}) {
  const { baseScene, initialClients = [CLIENT_TYPES.FLOATING] } = props;
  const [code, setCode] = useState(props.code);
  const [networkedDOMDocument, setNetworkedDOMDocument] = useState<EditableNetworkedDOM | null>(
    null,
  );

  const clients = initialClients.map((type) => ({
    type,
    id: getNextClientId(),
  }));

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
  }, [code, baseScene]);

  const handleResetClick = useCallback(() => {
    setCode(props.code);
  }, []);

  return (
    <>
      <div className="relative h-[50px] border-b-[1px] border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white">
        {props.description}
        <button
          onClick={handleResetClick}
          className="top-[17px absolute right-[17px] h-[16px] w-[17px]"
        >
          <img
            className="invert filter dark:filter-none"
            src="/images/hero/resetButton.svg"
            alt="reset"
            width={17}
            height={16}
          />
        </button>
      </div>
      <div className="relative flex h-[701px] flex-row border-[1px] border-r-0 border-t-0 border-editor-border dark:border-editor-border-dark xl:h-[calc(100vh-184px)]">
        <div className="h-full w-0 flex-[0_1_60%] border-r-[1px] border-editor-border dark:border-editor-border-dark">
          <div className="flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
            <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
              CODE
            </span>
          </div>
          <HTMLEditor
            className="h-[663px] xl:h-[calc(100vh-219px)]"
            code={code}
            setCode={setCode}
          />
        </div>
        <ExampleClientsSection
          networkedDOMDocument={networkedDOMDocument}
          clients={clients}
          sectionWidth="40%"
          baseScene={props.baseScene}
          hideButtons
        />
      </div>
    </>
  );
}
