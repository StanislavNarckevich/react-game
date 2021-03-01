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
        <ChoiceTable
          changeTable={props.changeTable}
          selectedTable={props.selectedTable}
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

function ChoiceTable(props) {
  return (
    <div className="">
      <span>Choice table</span>
      <select name="select" onChange={props.changeTable}>
        {/* <option> Select color table</option> */}
        <option
          value="yellow-table"
          selected={props.selectedTable === "yellow-table" ? false : true}
        >
          {" "}
          Yellow
        </option>
        <option
          value="green-table"
          selected={props.selectedTable === "green-table" ? true : false}
        >
          Green
        </option>
        <option
          value="blue-table"
          selected={props.selectedTable === "blue-table" ? true : false}
        >
          Blue{" "}
        </option>
      </select>
    </div>
  );
}
