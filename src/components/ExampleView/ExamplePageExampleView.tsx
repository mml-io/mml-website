"use client";

import { EditableNetworkedDOM } from "@mml-io/networked-dom-document";
import { IframeObservableDOMFactory } from "@mml-io/networked-dom-web-runner";
import * as React from "react";


import HTMLEditor from "@/src/components/ExampleView/HTMLEditor";

import { CloseableClient } from "./CloseableClient";

function createDocumentCode(code: string, lightOn: boolean): string {
  return `${
    lightOn &&
    '<m-plane color="white" width="20" height="20" rx="-90"></m-plane><m-light type="directional" ry="45" rx="45" x="5" y="5" z="5"></m-light>'
  }${code}`;
}


  code: string;

  baseScene: boolean;

}) {
  const [code, setCode] = useState(props.code);
  const [networkedDOMDocument, setNetworkedDOMDocument] = useState<EditableNetworkedDOM | null>(
    null,
  );

  const [baseScene, setBaseScene] = useState<boolean>(props.baseScene);

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

  const toggleBaseScene = () => {
    setBaseScene((lightOn) => !lightOn);
  };





  return (















      </div>


















      </div>

  );
}
