export type Example = {
  name: string;
  image: string;
  description: string;
  code: string;
  baseScene?: boolean;
};

export type ExamplesByName = {
  [key: string]: Example;
};
