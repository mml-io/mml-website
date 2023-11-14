// Technically not a type but I'm not sure where to put this constant
export const CLIENT_TYPES = {
  FLOATING: "floating",
  AVATAR: "avatar",
} as const;

export type ClientType = (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES];

export type DocsReference = {
  title: string;
  description: string;
  code: string;
  baseSceneOn?: boolean;
  clients?: ClientType[];
  showClientsControls?: boolean;
};

export type DocsExamples = {
  [key: string]: DocsReference;
};

export type DocsExamplesByTag = {
  [key: string]: { examples: DocsExamples };
};
