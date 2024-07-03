import * as React from "react";

export default function ExampleClientView(props: {
  children?: React.ReactNode;
  elementRef: React.Ref<HTMLDivElement>;
}) {
  const { children, elementRef } = props;

  return (
    <div className="relative h-full min-h-0 w-full min-w-0" ref={elementRef}>
      {children}
    </div>
  );
}
