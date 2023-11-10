import dynamic from "next/dynamic";

import type { DocsExampleViewProps } from "@/src/components/ExampleView/DocsExampleView";

const ExampleViewStatic = dynamic<Partial<DocsExampleViewProps>>(
  () => import("@/src/components/ExampleView/DocsExampleView").then((mod) => mod.DocsExampleView),
  { ssr: false },
);

export default function ExampleView(props: DocsExampleViewProps) {
  return <ExampleViewStatic {...props} />;
}
