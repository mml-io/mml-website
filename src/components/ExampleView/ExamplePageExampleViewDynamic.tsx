import dynamic from "next/dynamic";

type ExampleViewProps = {
  code: string;
  baseScene?: boolean;
  initialClientCount?: number;
  description?: string;
};

const ExamplePageExampleViewStatic = dynamic<Partial<ExampleViewProps>>(
  () =>
    import("@/src/components/ExampleView/ExamplePageExampleView").then(
      (mod) => mod.ExamplePageExampleView,
    ),
  { ssr: false },
);

export default function ExamplePageExampleView({
  code,
  description,
  baseScene,
  initialClientCount,
}: ExampleViewProps) {
  return (
    <ExamplePageExampleViewStatic
      baseScene={baseScene}
      initialClientCount={initialClientCount ?? 1}
      code={code}
      description={description ?? "Demo"}
    />
  );
}
