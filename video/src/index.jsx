import { Composition, registerRoot } from "remotion";
import { CoverLoop } from "./CoverLoop.jsx";
import { Vertical } from "./Vertical.jsx";
import { CoverPoster } from "./CoverPoster.jsx";
import { FPS } from "../lib/story.mjs";

// Real props come from bin/render.mjs; durations follow the storyboard.
const Root = () => (
  <>
    <Composition id="CoverLoop" component={CoverLoop} width={1280} height={544} fps={FPS} durationInFrames={5 * FPS} />
    <Composition id="CoverPoster" component={CoverPoster} width={1280} height={544} fps={FPS} durationInFrames={1} />
    <Composition id="Vertical" component={Vertical} width={1080} height={1920} fps={FPS} durationInFrames={30 * FPS}
      calculateMetadata={({ props }) => ({ durationInFrames: props.durationInFrames })} />
  </>
);
registerRoot(Root);
