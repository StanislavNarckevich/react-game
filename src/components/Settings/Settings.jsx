import React, { useState } from "react";
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Fullscreen from "fullscreen-react";

import "./Settings.scss";

export default function Settings(props) {
  //   const handle = useFullScreenHandle();
  const [isEnter, setIsEnter] = useState(false);

  return (
    <div className="settings-page">
      <div className="settings-window">
        <button
          onClick={() => {
            setIsEnter(true);
          }}
        >
          Go Fullscreen
        </button>

        <Fullscreen isEnter={isEnter} onChange={setIsEnter}>
          <div className="full-screenable-node">
            Hi! This may cover the entire monitor.
          </div>
        </Fullscreen>
      </div>
    </div>
  );
}
