import React, { useContext } from "react";

import { AnimatedEditorContext } from "@/src/components/AnimatedEditor/AnimatedEditorContainer";

// I want all the props for an html element to be passed in
type EditorProps = React.HTMLAttributes<HTMLDivElement>;

export function CodemirrorEditor({ onClick: onClickProps, ...props }: EditorProps) {
  const { editorContainerRef, onClick: clearTimeoutHandler } = useContext(AnimatedEditorContext);

  const handleClick = (e) => {
    clearTimeoutHandler();
    onClickProps?.(e);
  };

  return <div {...props} onClick={handleClick} ref={editorContainerRef} />;
}
