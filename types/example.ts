export type Example = {
  name: string;
  image: string;
  description: string;
  code: string;
};

export type ExamplesByName = {
  [key: string]: Example;
};
