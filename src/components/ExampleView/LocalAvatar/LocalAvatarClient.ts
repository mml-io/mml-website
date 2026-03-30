import {
  AnimationConfig,
  CameraManager,
  CameraTransform,
  CharacterDescription,
  CharacterManager,
  CharacterState,
  CollisionsManager,
  createDefaultCharacterControllerValues,
  EulXYZ,
  IRenderer,
  KeyInputManager,
  RendererConfig,
  RenderState,
  SpawnConfigurationState,
  Vect3,
} from "@mml-io/3d-web-client-core";
import { ThreeJSWorldRenderer } from "@mml-io/3d-web-threejs";
import { LoadingProgressManager } from "@mml-io/mml-web";
import { MMLWebRunnerClient } from "@mml-io/mml-web-runner";
import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";

import hdriPath from "./assets/hdr/industrial_sunset_2k.hdr";
import airAnimationFileUrl from "./assets/models/anim_air.glb";
import doubleJumpAnimationFileUrl from "./assets/models/anim_double_jump.glb";
import idleAnimationFileUrl from "./assets/models/anim_idle.glb";
import jogAnimationFileUrl from "./assets/models/anim_jog.glb";
import sprintAnimationFileUrl from "./assets/models/anim_run.glb";
import avatar1Url from "./assets/models/avatar-1-bodyA-skin01.glb";
import avatar2Url from "./assets/models/avatar-2-bodyB-skin03.glb";
import avatar3Url from "./assets/models/avatar-3-bodyA-skin05.glb";
import avatar4Url from "./assets/models/avatar-4-bodyB-skin07.glb";
import { LocalAvatarServer } from "./LocalAvatarServer";

const animationConfig: AnimationConfig = {
  idleAnimationFileUrl,
  jogAnimationFileUrl,
  sprintAnimationFileUrl,
  airAnimationFileUrl,
  doubleJumpAnimationFileUrl,
};

const defaultAvatars: CharacterDescription[] = [
  { meshFileUrl: avatar2Url },
  { meshFileUrl: avatar1Url },
  { meshFileUrl: avatar4Url },
  { meshFileUrl: avatar3Url },
];

export class LocalAvatarClient {
  public element: HTMLDivElement;
  public readonly loadingProgressManager: LoadingProgressManager;
  private canvasHolder: HTMLDivElement;

  private renderer: IRenderer;
  private readonly keyInputManager = new KeyInputManager(() => {
    return this.cameraManager.hasActiveInput();
  });
  private readonly characterManager: CharacterManager;
  private readonly cameraManager: CameraManager;

  private readonly collisionsManager = new CollisionsManager();
  private readonly remoteUserStates = new Map<number, CharacterState>();

  private resizeObserver: ResizeObserver;
  private documentRunnerClients = new Set<MMLWebRunnerClient>();
  private animationFrameRequest: number | null = null;

  private cachedCameraTransform: CameraTransform = {
    position: new Vect3(),
    rotation: { x: 0, y: 0, z: 0 },
    fov: 0,
  };
  private lastUpdateTimeMs: number = 0;
  private frameCounter: number = 0;

  constructor(
    private localAvatarServer: LocalAvatarServer,
    private localClientId: number,
    spawnConfiguration: SpawnConfigurationState,
    mmlTargetWindow: Window,
    mmlTargetElement: HTMLElement,
    private username: string = "User",
  ) {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    this.canvasHolder = document.createElement("div");
    this.canvasHolder.style.position = "absolute";
    this.canvasHolder.style.width = "100%";
    this.canvasHolder.style.height = "100%";
    this.element.appendChild(this.canvasHolder);

    this.cameraManager = new CameraManager(
      this.canvasHolder,
      this.collisionsManager,
      Math.PI / 2,
      Math.PI / 2,
    );

    const rendererConfig: RendererConfig = {
      animationConfig,
      environmentConfiguration: {
        skybox: {
          hdrUrl: hdriPath,
        },
      },
      postProcessingEnabled: false,
      spawnSun: true,
      enableTweakPane: false,
    };

    this.loadingProgressManager = new LoadingProgressManager();

    this.renderer = new ThreeJSWorldRenderer({
      targetElement: this.canvasHolder,
      coreCameraManager: this.cameraManager,
      collisionsManager: this.collisionsManager,
      config: rendererConfig,
      tweakPane: null,
      mmlTargetWindow,
      mmlTargetElement,
      // Cast needed: duplicate @mml-io/mml-web in nested node_modules makes types incompatible
      loadingProgressManager: this.loadingProgressManager as any,
      mmlDocuments: {},
      mmlAuthToken: null,
    });

    this.resizeObserver = new ResizeObserver(() => {
      this.renderer.fitContainer();
    });
    this.resizeObserver.observe(this.element);

    this.localAvatarServer.addClient(
      localClientId,
      (clientId: number, userNetworkingClientUpdate: null | CharacterState) => {
        if (userNetworkingClientUpdate === null) {
          this.remoteUserStates.delete(clientId);
        } else {
          this.remoteUserStates.set(clientId, userNetworkingClientUpdate);
        }
      },
      this.username,
    );

    this.characterManager = new CharacterManager({
      collisionsManager: this.collisionsManager,
      cameraManager: this.cameraManager,
      keyInputManager: this.keyInputManager,
      remoteUserStates: this.remoteUserStates,
      sendUpdate: (characterState: CharacterState) => {
        localAvatarServer.send(localClientId, characterState);
      },
      sendLocalCharacterColors: () => {
        // no-op
      },
      characterResolve: (clientId: number) => {
        return {
          username: this.localAvatarServer.getUsername(clientId),
          characterDescription: defaultAvatars[clientId % defaultAvatars.length],
          colors: [],
        };
      },
      spawnConfiguration,
      characterControllerValues: createDefaultCharacterControllerValues(),
    });

    const spawnPosition = new Vect3(
      spawnConfiguration.spawnPosition.x,
      spawnConfiguration.spawnPosition.y,
      spawnConfiguration.spawnPosition.z,
    );
    const spawnRotation = new EulXYZ(0, spawnConfiguration.spawnYRotation * (Math.PI / 180), 0);
    this.characterManager.spawnLocalCharacter(localClientId, spawnPosition, spawnRotation);

    const offset = new Vect3(0, 0, 3.3);
    offset.applyEulerXYZ(new EulXYZ(0, spawnRotation.y, 0));
    const cameraPosition = spawnPosition.clone().sub(offset).add(CharacterManager.headTargetOffset);

    const cameraState = this.cameraManager.getMainCameraState();
    cameraState.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    this.cameraManager.setTarget(
      new Vect3().add(spawnPosition).add(CharacterManager.headTargetOffset),
    );
    this.cameraManager.reverseUpdateFromPositions(cameraState.position, cameraState.rotation);
  }

  public dispose() {
    if (this.animationFrameRequest !== null) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
    for (const documentRunnerClient of this.documentRunnerClients) {
      documentRunnerClient.dispose();
    }
    this.localAvatarServer.removeClient(this.localClientId);
    this.documentRunnerClients.clear();
    this.resizeObserver.disconnect();
    this.characterManager.dispose();
    this.cameraManager.dispose();
    this.renderer.dispose();
    this.element.remove();
  }

  public update(): void {
    const currentTimeMs = performance.now();
    const elapsedMs = currentTimeMs - this.lastUpdateTimeMs;
    this.lastUpdateTimeMs = currentTimeMs;

    let deltaTimeSeconds = elapsedMs / 1000;
    if (deltaTimeSeconds > 0.1) {
      deltaTimeSeconds = 0.1;
    }
    this.frameCounter++;

    const { updatedCharacterDescriptions, removedConnectionIds } = this.characterManager.update(
      deltaTimeSeconds,
      this.frameCounter,
    );

    this.cameraManager.update();

    const allCharacterStates = this.characterManager.getAllCharacterStates();

    const cameraState = this.cameraManager.getCameraState();
    const cameraRotation = new EulXYZ().setFromQuaternion(cameraState.rotation);
    this.cachedCameraTransform.position.set(
      cameraState.position.x,
      cameraState.position.y,
      cameraState.position.z,
    );
    this.cachedCameraTransform.rotation.x = cameraRotation.x;
    this.cachedCameraTransform.rotation.y = cameraRotation.y;
    this.cachedCameraTransform.rotation.z = cameraRotation.z;
    this.cachedCameraTransform.fov = cameraState.fov;

    const renderState: RenderState = {
      characters: allCharacterStates,
      updatedCharacterDescriptions,
      removedConnectionIds,
      cameraTransform: this.cachedCameraTransform,
      localCharacterId: this.characterManager.getLocalConnectionId(),
      deltaTimeSeconds,
    };

    this.renderer.render(renderState);

    this.animationFrameRequest = requestAnimationFrame(() => {
      this.update();
    });
  }

  public addDocument(
    mmlDocument: NetworkedDOM | EditableNetworkedDOM,
    windowTarget: Window,
    remoteHolderElement: HTMLElement,
  ) {
    const parentScene = (this.renderer as ThreeJSWorldRenderer).mmlCompositionScene!
      .mmlScene as any;

    // Create a child progress manager for this document, mirroring how
    // MMLLocalSource/MMLNetworkSource register with the parent.
    const documentProgressManager = new LoadingProgressManager();
    this.loadingProgressManager.addLoadingDocument(
      mmlDocument,
      "local-document",
      documentProgressManager as any,
    );

    // Wrap the scene so elements within this document register assets
    // with the document-level progress manager (not the root).
    const wrappedScene = new Proxy(parentScene, {
      get(target: any, prop: string | symbol) {
        if (prop === "getLoadingProgressManager") {
          return () => documentProgressManager;
        }
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
    });

    // Propagate child progress changes to the parent so the LoadingScreen updates.
    documentProgressManager.addProgressCallback(() => {
      this.loadingProgressManager.updateDocumentProgress(mmlDocument);
    });

    const mmlWebRunnerClient = new MMLWebRunnerClient(
      windowTarget,
      remoteHolderElement,
      wrappedScene,
    );
    mmlWebRunnerClient.connect(mmlDocument);
    this.documentRunnerClients.add(mmlWebRunnerClient);

    // Call child setInitialLoad once assets are registered. The FakeWebsocket
    // delivers content asynchronously, so assets aren't available immediately.
    documentProgressManager.addProgressCallback(() => {
      if (
        documentProgressManager.initialLoad === false &&
        documentProgressManager.summary.totalToLoad > 0
      ) {
        documentProgressManager.setInitialLoad(true);
      }
    });
    // Fallback for documents with no loadable assets.
    setTimeout(() => {
      if (documentProgressManager.initialLoad === false) {
        documentProgressManager.setInitialLoad(true);
      }
    }, 2000);
  }

  /**
   * Signal that all documents have been added. Must be called after the
   * last addDocument() call so the LoadingScreen can track completion.
   */
  public setInitialLoadComplete(): void {
    this.loadingProgressManager.setInitialLoad(true);
  }
}
