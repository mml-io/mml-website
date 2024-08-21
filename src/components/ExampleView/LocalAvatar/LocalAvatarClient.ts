import {
  AnimationConfig,
  CameraManager,
  CharacterDescription,
  CharacterManager,
  CharacterModelLoader,
  CharacterState,
  CollisionsManager,
  Composer,
  KeyInputManager,
  MMLCompositionScene,
  TimeManager,
} from "@mml-io/3d-web-client-core";
import { EditableNetworkedDOM, NetworkedDOM } from "@mml-io/networked-dom-document";
import { IMMLScene } from "mml-web";
import { MMLWebRunnerClient } from "mml-web-runner";
import { AudioListener, Euler, Scene, Vector3 } from "three";

import hdriPath from "./assets/hdr/industrial_sunset_2k.hdr";
import airAnimationFileUrl from "./assets/models/anim_air.glb";
import doubleJumpAnimationFileUrl from "./assets/models/anim_double_jump.glb";
import idleAnimationFileUrl from "./assets/models/anim_idle.glb";
import jogAnimationFileUrl from "./assets/models/anim_jog.glb";
import sprintAnimationFileUrl from "./assets/models/anim_run.glb";
import meshFileUrl from "./assets/models/bot.glb";
import { LocalAvatarServer } from "./LocalAvatarServer";
import { Room } from "./Room";

const animationConfig: AnimationConfig = {
  idleAnimationFileUrl,
  jogAnimationFileUrl,
  sprintAnimationFileUrl,
  airAnimationFileUrl,
  doubleJumpAnimationFileUrl,
};

const characterDescription: CharacterDescription = {
  meshFileUrl,
};

export class LocalAvatarClient {
  public element: HTMLDivElement;

  private readonly scene = new Scene();
  private readonly audioListener = new AudioListener();
  public readonly composer: Composer;
  private readonly timeManager = new TimeManager();
  private readonly keyInputManager = new KeyInputManager(() => {
    return this.cameraManager.hasActiveInput();
  });
  private readonly characterManager: CharacterManager;
  private readonly cameraManager: CameraManager;

  private readonly collisionsManager = new CollisionsManager(this.scene);
  private readonly remoteUserStates = new Map<number, CharacterState>();

  private mmlComposition: MMLCompositionScene;
  private resizeObserver: ResizeObserver;
  private documentRunnerClients = new Set<MMLWebRunnerClient>();
  private animationFrame: number;
  private characterModelLoader = new CharacterModelLoader();

  constructor(
    private localAvatarServer: LocalAvatarServer,
    private localClientId: number,
    spawnPosition: Vector3,
    spawnRotation: Euler,
  ) {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.width = "100%";
    this.element.style.height = "100%";

    document.addEventListener("mousedown", () => {
      if (this.audioListener.context.state === "suspended") {
        this.audioListener.context.resume();
      }
    });

    this.cameraManager = new CameraManager(
      this.element,
      this.collisionsManager,
      Math.PI / 2,
      Math.PI / 2,
    );
    this.cameraManager.camera.add(this.audioListener);

    this.composer = new Composer({
      scene: this.scene,
      camera: this.cameraManager.camera,
      spawnSun: true,
      environmentConfiguration: {},
    });
    this.composer.useHDRI(hdriPath);
    this.element.appendChild(this.composer.renderer.domElement);

    this.resizeObserver = new ResizeObserver(() => {
      this.composer.fitContainer();
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
    );

    this.characterManager = new CharacterManager({
      composer: this.composer,
      characterModelLoader: this.characterModelLoader,
      collisionsManager: this.collisionsManager,
      cameraManager: this.cameraManager,
      timeManager: this.timeManager,
      keyInputManager: this.keyInputManager,
      remoteUserStates: this.remoteUserStates,
      sendUpdate: (characterState: CharacterState) => {
        localAvatarServer.send(localClientId, characterState);
      },
      animationConfig,
      characterResolve: () => {
        return { username: "User", characterDescription };
      },
    });
    (this.characterManager as any).updateLocationHash = false;
    this.scene.add(this.characterManager.group);

    this.mmlComposition = new MMLCompositionScene({
      targetElement: this.element,
      renderer: this.composer.renderer,
      scene: this.scene,
      camera: this.cameraManager.camera,
      audioListener: this.audioListener,
      collisionsManager: this.collisionsManager,
      getUserPositionAndRotation: () => {
        return this.characterManager.getLocalCharacterPositionAndRotation();
      },
    });
    this.scene.add(this.mmlComposition.group);

    const room = new Room();
    this.collisionsManager.addMeshesGroup(room);
    this.scene.add(room);

    this.characterManager.spawnLocalCharacter(
      localClientId,
      "User",
      characterDescription!,
      spawnPosition,
      spawnRotation,
    );

    this.cameraManager.camera.position.copy(spawnPosition).add(new Vector3(0, 1.5, 3.3));
    this.cameraManager.setTarget(
      new Vector3().add(spawnPosition).add(this.characterManager.headTargetOffset),
    );
    this.cameraManager.reverseUpdateFromPositions();
  }

  public dispose() {
    cancelAnimationFrame(this.animationFrame);
    for (const documentRunnerClient of this.documentRunnerClients) {
      documentRunnerClient.dispose();
    }
    this.localAvatarServer.removeClient(this.localClientId);
    this.documentRunnerClients.clear();
    this.resizeObserver.disconnect();
    this.mmlComposition.dispose();
    this.characterManager.clear();
    this.cameraManager.dispose();
    this.composer.dispose();
    this.element.remove();
  }

  public update(): void {
    this.timeManager.update();
    this.characterManager.update();
    this.cameraManager.update();
    this.composer.sun?.updateCharacterPosition(this.characterManager.localCharacter?.position);
    this.composer.render(this.timeManager);
    this.animationFrame = requestAnimationFrame(() => {
      this.update();
    });
  }

  public addDocument(
    mmlDocument: NetworkedDOM | EditableNetworkedDOM,
    windowTarget: Window,
    remoteHolderElement: HTMLElement,
  ) {
    const mmlWebRunnerClient = new MMLWebRunnerClient(
      windowTarget,
      remoteHolderElement,
      this.mmlComposition.mmlScene as IMMLScene,
    );
    mmlWebRunnerClient.connect(mmlDocument);
    this.documentRunnerClients.add(mmlWebRunnerClient);
  }
}
