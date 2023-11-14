import dynamic from "next/dynamic";

import { ClientType } from "@/types/docs-reference";

type ExampleViewProps = {
  code: string;
  initialClients: ClientType[];
  baseScene?: boolean;
  description: string;
  showClientsControls?: boolean;
};

const ExamplePageExampleViewStatic = dynamic<Partial<ExampleViewProps>>(
  () =>
    import("@/src/components/ExampleView/ExamplePageExampleView").then(
      (mod) => mod.ExamplePageExampleView,
    ),
  { ssr: false },
);

export default function ExamplePageExampleView(props: ExampleViewProps) {
  return <ExamplePageExampleViewStatic {...props} />;
}
