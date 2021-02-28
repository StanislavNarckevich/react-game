import React, { useState, useEffect } from "react";

import "./Settings.scss";

export default function Settings(props) {
  return (
    <div className="settings-page">
      <div className="settings-window">
        <button onClick={props.fullscreenBtn}>Go Fullscreen</button>
        <Volume name={"Music Volume"} />
      </div>
    </div>
  );
}

function Volume(props) {
  const [value, onChange] = useState(1);
  useEffect(() => {
    const ele = document.querySelector(".buble");
    if (ele) {
      ele.style.left = `${Number(value / 4)}px`;
    }
  });
  return (
    <div className="slider-parent">
      <label>
        {props.name}
        <input
          type="range"
          min="1"
          max="100"
          value={value}
          onChange={({ target: { value: radius } }) => {
            onChange(radius);
          }}
        />
      </label>
      {/* <div className="buble">{value}</div> */}
    </div>
  );
}
