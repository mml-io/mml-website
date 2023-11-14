import { ClientType } from "@/types/docs-reference";

export type Example = {
  name: string;
  image: string;
  description: string;
  code: string;
  baseScene?: boolean;
  clients?: ClientType[];
};

export type ExamplesByName = {
  [key: string]: Example;
};
