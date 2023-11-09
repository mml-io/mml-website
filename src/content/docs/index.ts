import { DocsExamplesByTag } from "@/types/docs-reference";

import * as connectionEvent from "./connectionEvent";
import * as mAttrAnim from "./m-attr-anim";
import * as mAudio from "./m-audio";
import * as mCharacter from "./m-character";
import * as mCube from "./m-cube";
import * as mCylinder from "./m-cylinder";
import * as mFrame from "./m-frame";
import * as mGroup from "./m-group";
import * as mImage from "./m-image";
import * as mLabel from "./m-label";
import * as mLight from "./m-light";
import * as mModel from "./m-model";
import * as mPlane from "./m-plane";
import * as mPositionProbe from "./m-position-probe";
import * as mPrompt from "./m-prompt";
import * as mSphere from "./m-sphere";
import * as mVideo from "./m-video";
import * as mmlChatEvent from "./mmlChatEvent";
import * as mmlClickEvent from "./mmlClickEvent";
import * as mmlCollisionEndEvent from "./mmlCollisionEndEvent";
import * as mmlCollisionMoveEvent from "./mmlCollisionMoveEvent";
import * as mmlCollisionStartEvent from "./mmlCollisionStartEvent";
import * as mmlInteractionEvent from "./mmlInteractionEvent";
import * as mmlPositionEnterEvent from "./mmlPositionEnterEvent";
import * as mmlPositionLeaveEvent from "./mmlPositionLeaveEvent";
import * as mmlPositionMoveEvent from "./mmlPositionMoveEvent";
import * as mmlPromptEvent from "./mmlPromptEvent";

export const examples: DocsExamplesByTag = {
  "m-cube": mCube,
  "m-cylinder": mCylinder,
  "m-sphere": mSphere,
  "m-audio": mAudio,
  "m-video": mVideo,
  "m-plane": mPlane,
  "m-light": mLight,
  "m-model": mModel,
  "m-character": mCharacter,
  "m-group": mGroup,
  "m-label": mLabel,
  "m-frame": mFrame,
  "m-prompt": mPrompt,
  "m-position-probe": mPositionProbe,
  "m-attr-anim": mAttrAnim,
  "m-image": mImage,
  ConnectionEvent: connectionEvent,
  MMLChatEvent: mmlChatEvent,
  MMLClickEvent: mmlClickEvent,
  MMLCollisionEndEvent: mmlCollisionEndEvent,
  MMLCollisionMoveEvent: mmlCollisionMoveEvent,
  MMLCollisionStartEvent: mmlCollisionStartEvent,
  MMLInteractionEvent: mmlInteractionEvent,
  MMLPositionEnterEvent: mmlPositionEnterEvent,
  MMLPositionLeaveEvent: mmlPositionLeaveEvent,
  MMLPositionMoveEvent: mmlPositionMoveEvent,
  MMLPromptEvent: mmlPromptEvent,
};
