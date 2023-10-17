import CodeMirror from "codemirror";
import beautify from "js-beautify";
import ot, { EditorClient, Operation, Selection } from "ot-es.js";
import React, { createContext, useEffect, useRef } from "react";

import {
  editorState,
  EditorStateOperation,
} from "@/src/components/AnimatedExampleView/EditorState";

import OTServerAdapter from "./otServerAdapter";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/display/placeholder.js";
import "codemirror/theme/material-darker.css";

type AnimatedEditorParentProps = {
  children: React.ReactNode;
  code: string;
  setCode: (s: string) => void;
  appendCode?: string;
  setAppendCode: (s: string | undefined) => void;
};

export const AnimatedEditorContext = createContext<{
  editorContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  onClick: () => void;
} | null>(null);

export const AnimatedEditorContainer = ({
  children,
  code,
  setCode,
  appendCode,
  setAppendCode,
}: AnimatedEditorParentProps) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const codeMirrorRef = useRef<CodeMirror.Editor>();

  const codeMirrorAdapterRef = useRef<ot.CodeMirrorAdapter>();
  const otServerAdapterRef = useRef<OTServerAdapter>();
  const otClientRef = useRef<EditorClient>();
  const stepIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const actionHistory = useRef<Array<EditorStateOperation>>([]);

  useEffect(() => {
    init();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (appendCode && otServerAdapterRef.current) {
      clearTimeout(timerRef.current);
      deleteAll();

      const beautifiedCode = beautify.html(code);
      const newCode = beautifiedCode + appendCode;

      otServerAdapterRef.current.onChange("1", 0, [""], {
        ranges: [
          {
            anchor: 0,
            head: 0,
          },
        ],
      });

      otServerAdapterRef.current.onChange("1", 0, [999999, newCode, 10]);
      setAppendCode(undefined); // clear appendCode after operation
    }
  }, [appendCode, code]);

  const sendChange = (revision: number, operation: Operation, selection: Selection) => {
    console.log("Sending change", operation);

    // ADDING CHANGES TO ACTION HISTORY - USE TO RECORD SEQUENCE

    actionHistory.current.push({
      time: new Date().getTime(),
      type: "change",
      revision,
      operation,
      selection,
    });

    console.log("Action history", actionHistory.current);

    setTimeout(() => {
      if (otServerAdapterRef.current) {
        otServerAdapterRef.current.onChangeAccepted(revision);
      }
    });
  };

  const sendSelection = (selection: Selection) => {
    console.log("Sending selection", selection);

    // ADDING SELECTIONS TO ACTION HISTORY - USE TO RECORD SEQUENCE

    actionHistory.current.push({
      time: new Date().getTime(),
      type: "selection",
      selection,
    });

    console.log("Action history", actionHistory.current);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const askForChanges = () => {};

  const deleteAll = () => {
    const otServerAdapter = otServerAdapterRef.current;
    if (!otServerAdapter) {
      throw new Error("otServerAdapter is not defined");
    }
    otServerAdapter.onChange("1", 0, [""], {
      ranges: [
        {
          anchor: 999999,
          head: 0,
        },
      ],
    });
    otServerAdapter.onChange("1", 0, [-999999], {
      ranges: [
        {
          anchor: 0,
          head: 0,
        },
      ],
    });
  };

  const timeoutSequence = () => {
    const currentStepItem = editorState[stepIndexRef.current];
    const { operation, selection, waitTime } = currentStepItem;

    const otServerAdapter = otServerAdapterRef.current;
    if (!otServerAdapter) {
      throw new Error("otServerAdapter is not defined");
    }

    otServerAdapter.onChange("1", 0, operation || [], selection);
    stepIndexRef.current++;

    if (stepIndexRef.current >= editorState.length) {
      const editorContainer = editorContainerRef.current;
      if (!editorContainer) {
        throw new Error("editorContainer is not defined");
      }
      editorContainer.style.display = "none";

      clearTimeout(timerRef.current);
      stepIndexRef.current = 0;
      deleteAll();
      otServerAdapter.onChange("1", 0, [code], {
        ranges: [
          {
            anchor: 0,
            head: 0,
          },
        ],
      });

      timerRef.current = setTimeout(() => timeoutSequence(), 2000);
      editorContainer.style.display = "block";
      return;
    }

    timerRef.current = setTimeout(() => timeoutSequence(), waitTime || 100);
  };

  const handleEditorClick = () => {
    clearTimeout(timerRef.current);
  };

  const init = () => {
    if (!editorContainerRef.current) {
      throw new Error("editorContainerRef is not defined");
    }
    const codeMirror = CodeMirror(editorContainerRef.current, {
      lineNumbers: true,
      lineWrapping: true,
      mode: "htmlmixed", // Use the custom mode
      theme: "material-darker",
    });

    const codeMirrorAdapter = new ot.CodeMirrorAdapter(codeMirror);

    const otServerAdapter = new OTServerAdapter(sendChange, sendSelection, askForChanges);

    const otClient = new EditorClient(0, [], otServerAdapter, codeMirrorAdapter);

    codeMirrorRef.current = codeMirror;
    codeMirrorAdapterRef.current = codeMirrorAdapter;
    otClientRef.current = otClient;
    otServerAdapterRef.current = otServerAdapter;

    codeMirror.on("change", function (cm) {
      // Get the full content of the editor
      const content = cm.getValue();
      setCode(content);
    });

    // EXAMPLE OF MANUALLY SETTING CHANGES - USE RECORDED SEQUENCE AND TIMESTAMPS TO REPLAY

    otServerAdapter.onChange("1", 0, [code], {
      ranges: [
        {
          anchor: 0,
          head: 0,
        },
      ],
    });

    timerRef.current = setTimeout(() => {
      timeoutSequence();
    }, 2000);
  };

  return (
    <AnimatedEditorContext.Provider value={{ editorContainerRef, onClick: handleEditorClick }}>
      {children}
    </AnimatedEditorContext.Provider>
  );
};
