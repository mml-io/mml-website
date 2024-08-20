import { jest } from "@jest/globals";

Range.prototype.getBoundingClientRect = () => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: () => "hi",
});

Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: jest.fn() as () => IterableIterator<DOMRect>,
});

class IntersectionObserver {
  constructor() {}
  public observe() {}
  public unobserve() {}
  public disconnect() {}
}
(window as any).IntersectionObserver = IntersectionObserver;

jest.unstable_mockModule("next/dynamic", () => {
  return {
    __esModule: true,
    default: (...props: any[]) => {
      const dynamicModule = jest.requireActual("next/dynamic") as any;
      const dynamicActualComp = dynamicModule.default;
      const RequiredComponent = dynamicActualComp(props[0]);
      RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload();
      return RequiredComponent;
    },
  };
});
