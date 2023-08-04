"use client";

import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import { IframeObservableDOMFactory } from "@mml-io/networked-dom-web-runner";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import HTMLEditor from "@/src/components/ExampleView/HTMLEditor";

import { CloseableClient } from "./CloseableClient";

function createDocumentCode(code: string, lightOn: boolean): string {
  return `${
    lightOn &&
    '<m-plane color="white" width="20" height="20" rx="-90"></m-plane><m-light type="spotlight" ry="45" rx="65" rz="-45" x="10" y="10" z="10"></m-light>'
  }${code}`;
}

export function DocsExampleView(props: {
  code: string;
  initialClientCount?: number;
  baseScene: boolean;
  description: string;
}) {
  const [code, setCode] = useState(props.code);
  const [networkedDOMDocument, setNetworkedDOMDocument] = useState<EditableNetworkedDOM | null>(
    null,
  );
  const clients = [...Array(props.initialClientCount || 1).keys()];
  const { baseScene } = props;

  useEffect(() => {
    const document = new EditableNetworkedDOM(
      "http://example.com/index.html",
      IframeObservableDOMFactory,
      true,
    );
    document.load(createDocumentCode(code, baseScene));
    setNetworkedDOMDocument(document);

    return () => {
      document.dispose();
    };
  }, []);

  useEffect(() => {
    networkedDOMDocument?.load(createDocumentCode(code, baseScene));
  }, [code, baseScene]);

  const handleResetClick = useCallback(() => {
    setCode(props.code);
  }, []);

  return (
    <>
      <div className="relative h-[50px] border-[1px] border-b-0 border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white">
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
      <div className="relative flex h-[370px] flex-row border-[1px] border-editor-border dark:border-editor-border-dark">
        <div className="h-full w-0 flex-[0_0_60%] border-r-[1px] border-editor-border dark:border-editor-border-dark">
          <div className="flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
            <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
              CODE
            </span>
          </div>
          <HTMLEditor className="h-[332px]" code={code} setCode={setCode} />
        </div>
        <div className="relative flex h-full flex-[0_0_40%] flex-row">
          {networkedDOMDocument && (
            <>
              {clients.map((clientId) => {
                return <CloseableClient key={clientId} document={networkedDOMDocument} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
