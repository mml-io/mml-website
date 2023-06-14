import {
  IframeWrapper,
  registerCustomElementsToWindow,
} from "mml-web";

let windowTarget: Window | null = null;

export function getIframeTargetWindow() {
  if (windowTarget !== null) {
    return windowTarget;
  }
  const iframeRemoteSceneWrapper = new IframeWrapper();
  document.body.append(iframeRemoteSceneWrapper.iframe);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  windowTarget = iframeRemoteSceneWrapper.iframe.contentWindow!;
  registerCustomElementsToWindow(windowTarget);
  return windowTarget;
}
