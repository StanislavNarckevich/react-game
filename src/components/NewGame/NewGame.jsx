import React, { Component } from "react";
import "./NewGame.scss";
import { data as cardsData } from "./../../data";
import cardBackSide from "./../../assets/images/cards/card-back.png";

cardsData.sort(function () {
  return Math.random() - 0.5;
});

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

class StartGame extends Component {
  constructor() {
    super();
    this.state = {
      deck: cardsData,
      playerHand: [],
      opponentHand: [],
      isOpponentTurn: false,
      opponentScore: 0,
      playerScore: 0,
      result: null,
    };
  }

  componentDidMount() {
    this.newGame();
    console.log(this.state);
  }

  newGame = () => {
    setTimeout(this.playerTakeCard, 1000);
    setTimeout(this.playerTakeCard, 1500);
  };

  gameOver = () => {};

  playerTakeCard = () => {
    const deck = [...this.state.deck];
    const card = deck.pop();
    const playerHand = [...this.state.playerHand];
    playerHand.push(card);

    let playerScore = playerHand.reduce((acc, current) => {
      return acc + current.value;
    }, 0);

    this.setState({
      deck: deck,
      playerHand: playerHand,
      playerScore: playerScore,
    });
  };

  opponentTakeCard = () => {
    const deck = [...this.state.deck];
    const card = deck.pop();
    const opponentHand = [...this.state.opponentHand];
    opponentHand.push(card);
    this.setState({
      deck: deck,
      opponentHand: opponentHand,
    });
  };

  opponentTurn = () => {
    const opponentHand = [...this.state.opponentHand];
    let opponentScore = opponentHand.reduce((acc, current) => {
      return acc + current.value;
    }, 0);
    if (opponentScore < 17) {
      this.opponentTakeCard();
      this.setState({
        opponentScore: opponentScore,
      });
      setTimeout(this.opponentTurn, 1000);
    } else if (opponentScore < 20 && Math.random() * 10 > 7) {
      setTimeout(this.opponentTakeCard, 1000);
      this.setState({
        opponentScore: opponentScore,
      });
    } else {
      this.gameOver();
    }
    console.log(this.state);
  };

  handleHitBtn = () => {
    this.playerTakeCard();
    console.log(this.state);
  };

  handleStandBtn = () => {
    this.setState({
      isOpponentTurn: true,
    });

    this.opponentTurn();
    console.log(this.state);
  };

  render() {
    let { isOpponentTurn, deck, playerHand, opponentHand } = this.state;
    if (deck.length === 0) {
      alert("Deck is empty");
    }
    return (
      <div className="game-mode">
        <div className="game-field">
          <div className="card-place"></div>
          <div className="card-place"></div>
          <div className="card-place"></div>

          <img src={cardBackSide} alt="card-backside" />
          <img src={cardBackSide} alt="card-backside" />
        </div>
        <div className="player-hand">
          {playerHand.map((card) => {
            return <img src={card.src} alt="card" className="card " />;
          })}
        </div>
        <div className="opponent-hand">
          {opponentHand.map((card) => {
            return <img src={card.src} alt="card" className="card " />;
          })}
        </div>
        <button
          disabled={isOpponentTurn || deck.length === 0 ? true : false}
          onClick={this.handleHitBtn}
        >
          Hit
        </button>
        <button
          onClick={this.handleStandBtn}
          disabled={isOpponentTurn ? true : false}
        >
          Stand
        </button>
      </div>
    );
  }
}

export { Log, StartGame };
