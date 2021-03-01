import React, { useState, useEffect } from "react";

import "./Settings.scss";

export default function Settings(props) {
  return (
    <div className="settings-page">
      <div className="settings-window">
        <button onClick={props.fullscreenBtn}>Go Fullscreen</button>
        <MusicVolume
          changeMusicVolume={props.changeMusicVolume}
          musicVolume={props.musicVolume}
        />

        <SoundsVolume
          changeSoundsVolume={props.changeSoundsVolume}
          soundsVolume={props.soundsVolume}
        />
      </div>
    </div>
  );
}

function MusicVolume(props) {
  return (
    <div className="slider-parent">
      <label>
        Music volume
        <input
          type="range"
          min="1"
          max="100"
          value={props.musicVolume}
          onChange={props.changeMusicVolume}
        />
      </label>
    </div>
  );
}

function SoundsVolume(props) {
  return (
    <div className="">
      <label>
        Sounds volume
        <input
          type="range"
          min="1"
          max="100"
          value={props.soundsVolume}
          onChange={props.changeSoundsVolume}
        />
      </label>
    </div>
  );
}
