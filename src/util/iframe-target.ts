import { IframeWrapper, IframeWrapperResult, registerCustomElementsToWindow } from "mml-web";

let iframeRemoteSceneWrapperPromise: Promise<IframeWrapperResult> = null;

export function getIframeTargetWindow(): Promise<IframeWrapperResult> {
  if (iframeRemoteSceneWrapperPromise !== null) {
    return iframeRemoteSceneWrapperPromise;
  }
  iframeRemoteSceneWrapperPromise = IframeWrapper.create().then((wrapper) => {
    registerCustomElementsToWindow(wrapper.iframeWindow);
    return wrapper;
  });
  return iframeRemoteSceneWrapperPromise;
}
