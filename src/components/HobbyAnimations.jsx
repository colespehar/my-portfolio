import React from "react";
import Lottie from "lottie-react";
import cycling from "../assets/animations/cycling.json";
import golf from "../assets/animations/golf.json";
import gym from "../assets/animations/gym.json";

import { HOBBIES } from "./hobbies.js";

const DATA = { cycling, golf, gym };

// These are looping decorative animations. The stylesheet's reduced-motion
// rule only reaches CSS animations, so the JS-driven player needs its own
// check (WCAG 2.3.3). Read once at module load — this is a render-time
// decision and the preference changing mid-session is not worth a listener.
const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Split out of Hero so the ~306KB lottie-web player is fetched lazily
 * instead of blocking first paint. The placeholder in Hero mirrors this
 * layout exactly (see .hero-hobby-icon) so there is no shift on swap.
 *
 * Nothing else may import this module statically — doing so would pull
 * lottie-react back into the eager bundle.
 */
// Memoized: Hero re-renders once per typed character (~72 times over 3.6s),
// and this subtree takes no props, so without memo all three Lottie players
// would reconcile on every one of those renders.
const HobbyAnimations = React.memo(function HobbyAnimations() {
  return (
    <>
      {HOBBIES.map(({ key, label }) => (
        <div key={key} className="d-flex flex-column align-items-center">
          <Lottie
            animationData={DATA[key]}
            loop={!PREFERS_REDUCED_MOTION}
            autoplay={!PREFERS_REDUCED_MOTION}
            className="hero-hobby-icon"
          />
          <span className="hero-hobby-label text-light">{label}</span>
        </div>
      ))}
    </>
  );
});

export default HobbyAnimations;
