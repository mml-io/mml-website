import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import type { DocsExampleViewProps } from "@/src/components/ExampleView/DocsExampleView";

const ExampleViewStatic = dynamic<Partial<DocsExampleViewProps>>(
  () => import("@/src/components/ExampleView/DocsExampleView").then((mod) => mod.DocsExampleView),
  { ssr: false },
);

export default function ExampleView(props: DocsExampleViewProps & { containerHeight?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null, // viewport
        rootMargin: "500px", // Load 500px before the element comes into the viewport
        threshold: 0.01, // Trigger as soon as even 1% of the target is visible
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const { containerHeight } = props;

  return (
    <div
      className={twMerge("h-full w-full", containerHeight && `h-[${containerHeight}px]`)}
      ref={ref}
    >
      {isVisible && <ExampleViewStatic {...props} />}
    </div>
  );
}
