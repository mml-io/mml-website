import { CharacterState } from "@mml-io/3d-web-client-core";

export class LocalAvatarServer {
  private callbacks = new Map<
    number,
    (clientId: number, userNetworkingClientUpdate: null | CharacterState) => void
  >();
  private usernames = new Map<number, string>();

  send(clientId: number, userNetworkingClientUpdate: null | CharacterState) {
    this.callbacks.forEach((callback, callbackClientId) => {
      if (callbackClientId !== clientId) {
        callback(clientId, userNetworkingClientUpdate);
      }
    });
  }

  addClient(
    clientId: number,
    callback: (clientId: number, userNetworkingClientUpdate: null | CharacterState) => void,
    username?: string,
  ) {
    this.callbacks.set(clientId, callback);
    if (username) {
      this.usernames.set(clientId, username);
    }
  }

  getUsername(clientId: number): string {
    return this.usernames.get(clientId) ?? "User";
  }

  removeClient(clientId: number) {
    this.callbacks.delete(clientId);
    this.usernames.delete(clientId);

    this.callbacks.forEach((callback) => {
      callback(clientId, null);
    });
  }
}
