import React, { Component } from "react";
import "./NewGame.scss";
import { data as cardsData } from "./../../data/data";
import cardBackSide from "./../../assets/images/cards/card-back.png";

cardsData.sort(function () {
  return Math.random() - 0.5;
});

function Log(props) {
  console.log(cardsData);
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

class StartGame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="game-mode">
        <div className="game-field">
          <div className="card-place"></div>
          <div className="card-place"></div>
          <div className="card-place"></div>
          <img src={cardBackSide} alt="card-backside" />
        </div>
        <button>Hit</button>
        <button>Stand</button>
      </div>
    );
  }
}

export { Log, StartGame };
