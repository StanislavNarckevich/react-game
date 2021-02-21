import React from "react";
import "./NewGame.scss";

function Log(props) {
  return (
    <div className="Log">
      <span>Enter your name</span>
      <input onChange={props.getName} type="text" placeholder="your name" />
      {props.playerName.length > 0 ? (
        <button onClick={props.startGame}>Submit</button>
      ) : null}
    </div>
  );
}

function NewGame(props) {
  return;
}

export { Log, NewGame };
