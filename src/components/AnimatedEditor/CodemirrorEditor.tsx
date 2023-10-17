import React, { MouseEvent, useContext } from "react";

import { AnimatedEditorContext } from "@/src/components/AnimatedEditor/AnimatedEditorContainer";

// I want all the props for an html element to be passed in
type EditorProps = React.HTMLAttributes<HTMLDivElement>;

export function CodemirrorEditor({ onClick: onClickProps, ...props }: EditorProps) {
  const ctx = useContext(AnimatedEditorContext);
  if (!ctx) {
    throw new Error("AnimatedEditorContext not found");
  }
  const { editorContainerRef, onClick: clearTimeoutHandler } = ctx;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    clearTimeoutHandler();
    onClickProps?.(e);
  };

  return <div {...props} onClick={handleClick} ref={editorContainerRef} />;
}
