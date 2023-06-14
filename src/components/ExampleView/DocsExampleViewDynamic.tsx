import dynamic from "next/dynamic";

type ExampleViewProps = {
  code: string;
  baseScene?: boolean;
  initialClientCount?: number;
  description?: string;
};

const ExampleViewStatic = dynamic<Partial<ExampleViewProps>>(
  () => import("@/src/components/ExampleView/DocsExampleView").then((mod) => mod.DocsExampleView),
  { ssr: false },
);

export default function ExampleView({
  code,
  description,
  baseScene,
  initialClientCount,
}: ExampleViewProps) {
  return (
    <ExampleViewStatic
      baseScene={baseScene}
      initialClientCount={initialClientCount ?? 1}
      code={code}
      description={description ?? "Demo"}
    />
  );
}
