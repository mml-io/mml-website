import { Operation, Selection } from "ot-es.js";

type EditorCallback = {
  change?: (operation: Operation, inverse: Operation) => void;
  selectionChange?: () => void;
  blur?: () => void;
  set_color?: () => void;
  client_left?: () => void;
  ack?: () => void;
  operation?: () => void;
  operations?: () => void;
  selection?: () => void;
};

export default class OTServerAdapter {
  private callbacks?: EditorCallback;

  constructor(
    private forwardSendOperation: (
      revision: number,
      operation: Operation,
      selection: Selection,
    ) => void,
    private forwardSendSelection: (selection: Selection) => void,
    private forwardGetOperations: (base: number, head: number) => void,
  ) {}

  onClientConnected(clientId: string, color: string) {
    this.trigger("set_color", clientId, color);
  }

  onClientDisconnected(clientId: string) {
    this.trigger("client_left", clientId);
  }

  onChangeAccepted(number: number) {
    this.trigger("ack", number);
  }

  onChange(clientId: string, number: number, operation: any, selection?: any) {
    this.trigger("operation", number, operation);
    this.trigger("selection", clientId, selection);
  }

  onChanges(from: number, operations: any[]) {
    this.trigger("operations", from, operations);
  }

  onClientSelection(clientId: string, selection?: any) {
    this.trigger("selection", clientId, selection);
  }

  sendOperation(revision: number, operation: Operation, selection: Selection) {
    this.forwardSendOperation(revision, operation, selection);
  }

  sendSelection(selection: Selection) {
    this.forwardSendSelection(selection);
  }

  getOperations(base: number, head: number) {
    this.forwardGetOperations(base, head);
  }

  registerCallbacks(cb: EditorCallback) {
    this.callbacks = cb;
  }

  trigger(event: keyof EditorCallback, ...args: any[]) {
    const action = this.callbacks && this.callbacks[event];
    if (action) {
      try {
        action.apply(this, args);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
