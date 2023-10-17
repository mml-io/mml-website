declare module "ot-es.js" {
  export type Operation = [number, string, number] | [number, string];

  export type Selection = {
    ranges: Array<{
      anchor: number;
      head: number;
    }>;
  };

  export declare class EditorClient {
    constructor(revision: number, clients: Array<unknown>, serverAdapter, editorAdapter);
  }
  namespace ot {
    export declare class CodeMirrorAdapter {
      constructor(cm: CodeMirror.Editor);
    }
  }
  export default ot;
}
