import React, { Component } from "react";
import "./NewGame.scss";
import { data as cardsData } from "./../../data";
import cardBackSide from "./../../assets/images/cards/card-back.png";

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
    cardsData.sort(function () {
      return Math.random() - 0.5;
    });
    const deck = [...cardsData];

    this.state = {
      deck: deck,
      playerHand: [],
      opponentHand: [],
      isOpponentTurn: false,
      isGameOver: false,
      opponentScore: 0,
      playerScore: 0,
      result: null,
    };
  }

  componentDidMount() {
    this.newGame();
  }

  newGame = () => {
    setTimeout(this.playerTakeCard, 1000);
    setTimeout(this.playerTakeCard, 1500);
  };

  gameOver = () => {
    const { playerScore, opponentScore } = this.state;
    if (playerScore > opponentScore && playerScore < 22) {
      alert(
        `you win  playerscore ${playerScore}, opponentScore ${opponentScore}`
      );
      this.setState({ result: "win" });
    } else if (playerScore < opponentScore && playerScore > 21) {
      alert(
        `you win  playerscore ${playerScore}, opponentScore ${opponentScore}`
      );
      this.setState({ result: "win" });
    } else if (playerScore < opponentScore && opponentScore > 21) {
      alert(
        `you win  playerscore ${playerScore}, opponentScore ${opponentScore}`
      );
      this.setState({ result: "win" });
    } else if (playerScore === opponentScore) {
      alert("TIE");
      this.setState({ result: "tie" });
    } else {
      alert(
        `you lose  playerscore ${playerScore}, opponentScore ${opponentScore}`
      );
      this.setState({ result: "lose" });
    }
  };

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
    let opponentScore = opponentHand.reduce((acc, current) => {
      return acc + current.value;
    }, 0);
    this.setState({
      deck: deck,
      opponentHand: opponentHand,
      opponentScore: opponentScore,
    });
  };

  opponentTurn = () => {
    const opponentScore = this.state.opponentScore;
    if (opponentScore < 17) {
      this.opponentTakeCard();
      setTimeout(this.opponentTurn, 1000);
    } else {
      this.gameOver();
    }
  };

  handleHitBtn = () => {
    this.playerTakeCard();
  };

  handleStandBtn = () => {
    this.setState({
      isOpponentTurn: true,
    });

    this.opponentTurn();
  };

  restart = () => {
    if (this.state.deck.length < 2) {
      cardsData.sort(function () {
        return Math.random() - 0.5;
      });
      const deck = [...cardsData];
      this.setState({
        deck: deck,
      });
    }

    this.setState({
      playerHand: [],
      opponentHand: [],
      isOpponentTurn: false,
      isGameOver: false,
      opponentScore: 0,
      playerScore: 0,
    });
    this.newGame();
  };

  render() {
    console.log("render");
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
            return (
              <img src={card.src} alt="card" className="card " key={card.src} />
            );
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
        <button onClick={this.restart}>repeat</button>
      </div>
    );
  }
}

export { Log, StartGame };
