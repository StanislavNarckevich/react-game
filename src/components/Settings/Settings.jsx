import React, { useState, useEffect } from "react";
import MusicVolume from "./MusicVolume";
import SoundsVolume from "./SoundsVolume";
import SelectTable from "./SelectTable";
import SetDifficulty from "./SetDifficulty";
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
        <SelectTable
          changeTable={props.changeTable}
          selectedTable={props.selectedTable}
        />
        <SetDifficulty
          showScorePanel={props.showScorePanel}
          toggleScorePanel={props.toggleScorePanel}
        />
      </div>
    </div>
  );
}
