import { createSchemaDefinition, schemaJSON } from "@mml-io/mml-schema";





























































  const filteredExamples = examplesForElement
    ? Object.keys(examplesForElement.examples).filter((key) => key !== "primary")
    : [];



































































            {filteredExamples.length > 0 && (




                {filteredExamples.map((exampleKey) => {
                  const example = examplesForElement.examples[exampleKey];
                  return (
                    <div key={`${referenceId}-${example.title}`}>
                      <h3 className="mb-4 mt-8 text-[24px] font-medium">{example.title}</h3>
                      <MarkDown>{`${example.description}`}</MarkDown>
                      <ExampleView
                        description={example.title}
                        baseScene={example.baseSceneOn !== undefined ? example.baseSceneOn : true}
                        code={example.code}
                        initialClientCount={2}
                      />
                    </div>
                  );
                })}











