// import React, { Component } from "react";
// import ReactDOM from "react-dom";

import "./Main-menu.scss";

export default function MainMenu(props) {
  // if (props.conditions.isMenu) {
  return (
    <div className="MainMenu">
      <div className="menu">
        <button onClick={props.newGameBtnChange}>New Game </button>
        <button onClick={props.statsBtnChange}>Stats </button>
        <button onClick={props.settingsBtnChange}>Settings </button>
      </div>
    </div>
  );
  // }
}
