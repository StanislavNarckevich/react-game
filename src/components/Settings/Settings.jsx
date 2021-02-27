import React, { useState } from "react";

import "./Settings.scss";

export default function Settings(props) {
  return (
    <div className="settings-page">
      <div className="settings-window">
        <button onClick={props.fullscreenBtn}>Go Fullscreen</button>
      </div>
    </div>
  );
}
