import * as React from "react";
import { useEffect } from "react";
import ReactShadow from "react-shadow";

// Use an element that will be loaded/rendered when the Shadow DOM is loaded to trigger the onLoad event.
function OnLoadEl({ onLoad }: { onLoad: () => void }) {
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  return <></>;
}

export default function ExampleClientView(props: {
  children?: React.ReactNode;
  elementRef: React.Ref<HTMLDivElement>;
  onLoad: () => void;
}) {
  const { children, elementRef } = props;

  return (
    <div className="relative h-full min-h-0 w-full min-w-0">
      <ReactShadow.div className="relative h-full min-h-0 w-full min-w-0">
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
          }}
          ref={elementRef}
        ></div>
        <OnLoadEl onLoad={props.onLoad} />
      </ReactShadow.div>
      {children}
    </div>
  );
}
