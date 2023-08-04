"use client";

import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import { IframeObservableDOMFactory } from "@mml-io/networked-dom-web-runner";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { AnimatedEditorContainer, CodemirrorEditor } from "@/src/components/AnimatedEditor";

import { ExampleClient } from "./ExampleClient";

const CLIENTS = 4;

function createDocumentCode(code: string): string {
  return `${'<m-plane color="white" width="20" height="20" rx="-90"></m-plane><m-light type="spotlight" ry="45" rx="65" rz="-45" x="10" y="10" z="10"></m-light>'}${code}`;
}

const initialCode = `<m-cube x="-3" height="2" width="2" depth="2" y="2" color="#FF6666" id="my-cube"></m-cube>
<m-sphere x="3" radius="1" y="2" color="#66FF66" id="my-cube"></m-sphere>


`;

export function AnimatedExampleView(props) {
  const [code, setCode] = useState<string>(initialCode);
  const [networkedDOMDocument, setNetworkedDOMDocument] = useState<EditableNetworkedDOM | null>(
    null,
  );
  const [resetKey, setResetKey] = useState(0);
  const [appendCode, setAppendCode] = useState<string | undefined>(undefined);

  const documentRef = React.useRef<EditableNetworkedDOM | null>(null);

  const clients = [...Array(CLIENTS).keys()];

  useEffect(() => {
    const document = new EditableNetworkedDOM(
      "http://example.com/index.html",
      IframeObservableDOMFactory,
      true,
    );
    document.load(createDocumentCode(code));
    setNetworkedDOMDocument(document);

    return () => {
      document.dispose();
      documentRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (!documentRef.current) {
      documentRef.current = new EditableNetworkedDOM(
        "http://example.com/index.html",
        IframeObservableDOMFactory,
        true,
      );
      setNetworkedDOMDocument(documentRef.current);
    }

    documentRef.current.load(createDocumentCode(code));
  }, [code, props.baseScene]);

  const handleResetClick = useCallback(() => {
    setCode(initialCode);
    setResetKey((key) => key + 1);
  }, []);

  return (
    <AnimatedEditorContainer
      code={code}
      setCode={setCode}
      appendCode={appendCode}
      setAppendCode={setAppendCode}
      key={resetKey}
    >
      <div className="relative h-[50px] border-[1px] border-b-0 border-editor-border bg-white px-[17px] pt-[14px] leading-[19px] text-black dark:border-editor-border-dark dark:bg-editor-bg dark:text-white">
        Create an interactive, multi-user 3D scene with HTML and JavaScript
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
      <div className="flex h-[529px] border-[1px] border-editor-border dark:border-editor-border-dark">
        <div className="mb-16 h-full w-[44%]">
          <div className="flex h-[35px] border-b-[1px] border-editor-border bg-white dark:border-editor-border-dark dark:bg-editor-bg">
            <span className="inline-block h-full w-[83px] border-b-[3px] bg-transparent pt-2 text-center text-[13px] text-editor-title">
              CODE
            </span>
          </div>
          <CodemirrorEditor className="h-[492px] w-full" />
        </div>
        <div className=" relative flex w-[56%] flex-wrap content-between items-start">
          {networkedDOMDocument && (
            <>
              {clients.map((clientId) => {
                return (
                  <ExampleClient
                    clientId={clientId}
                    key={clientId}
                    document={networkedDOMDocument}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>

      {/*<button className="ml-4 h-12 w-24 bg-yellow" onClick={handleSphereClick}>*/}
      {/*  Sphere*/}
      {/*</button>*/}
    </AnimatedEditorContainer>
  );
}
