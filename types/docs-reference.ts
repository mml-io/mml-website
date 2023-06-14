export type DocsReference = {
  title: string;
  description: string;
  code: string;
  baseSceneOn?: boolean;
};

export type DocsExamples = {
  [key: string]: DocsReference;
};

export type DocsExamplesByTag = {
  [key: string]: { examples: DocsExamples };
};
