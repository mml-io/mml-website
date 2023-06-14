export default class OTServerAdapter {
  forwardSendOperation;
  forwardSendSelection;
  forwardGetOperations;
  private callbacks: any;

  constructor(forwardSendOperation: any, forwardSendSelection: any, forwardGetOperations: any) {
    this.forwardSendOperation = forwardSendOperation;
    this.forwardSendSelection = forwardSendSelection;
    this.forwardGetOperations = forwardGetOperations;
  }

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

  sendOperation(revision, operation, selection) {
    // console.log("Called sendOperation", revision, operation, selection);
    this.forwardSendOperation(revision, operation, selection);
  }

  sendSelection(selection) {
    // console.log('Called sendSelection', selection)
    this.forwardSendSelection(selection);
  }

  getOperations(base, head) {
    // console.log('Called getOperations', base, head)
    this.forwardGetOperations(base, head);
  }

  registerCallbacks(cb) {
    this.callbacks = cb;
  }

  trigger(event, ...args: any[]) {
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
