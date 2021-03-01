import React, { Component } from "react";
import "./NewGame.scss";
import { data as cardsData } from "./../../data";
import cardBackSide from "./../../assets/images/cards/card-back.png";
import cardSound from "../../assets/sounds/get-card.mp3";
import winSound from "../../assets/sounds/win.mp3";
import loseSound from "../../assets/sounds/lose.mp3";
import tieSound from "../../assets/sounds/tie.mp3";

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

  getCardSound = new Audio(cardSound);
  winSound = new Audio(winSound);
  loseSound = new Audio(loseSound);
  tieSound = new Audio(tieSound);

  componentDidMount() {
    this.newGame();
  }

  newGame = () => {
    setTimeout(this.playerTakeCard, 1000);
    setTimeout(this.playerTakeCard, 1500);
  };

  gameOver = () => {
    const { playerScore, opponentScore } = this.state;
    const win = () => {
      if (this.props.soundsOn) {
        this.winSound.play();
        this.winSound.volume = this.props.soundsVolume / 100;
      }
      alert(`YOU WIN`);
      this.setState({
        result: "win",
        isGameOver: true,
      });
    };
    if (playerScore > opponentScore && playerScore < 22) {
      win();
    } else if (playerScore < opponentScore && playerScore > 21) {
      win();
    } else if (playerScore < opponentScore && opponentScore > 21) {
      win();
    } else if (playerScore === opponentScore) {
      if (this.props.soundsOn) {
        this.tieSound.play();
        this.tieSound.volume = this.props.soundsVolume / 100;
      }
      alert("TIE");
      this.setState({
        result: "tie",
        isGameOver: true,
      });
    } else {
      if (this.props.soundsOn) {
        this.loseSound.volume = this.props.soundsVolume / 100;
        this.loseSound.play();
      }
      alert(`YOU LOSE`);
      this.setState({
        result: "lose",
        isGameOver: true,
      });
    }
  };

  playerTakeCard = () => {
    if (this.props.soundsOn) {
      this.getCardSound.play();
      this.getCardSound.volume = this.props.soundsVolume / 100;
    }
    const deck = [...this.state.deck];
    const card = deck.pop();
    const playerHand = [...this.state.playerHand];
    playerHand.push(card);

    let playerAltScore = playerHand.reduce((acc, current) => {
      return acc + current.altValue;
    }, 0);

    let playerScore = playerHand.reduce((acc, current) => {
      return acc + current.value;
    }, 0);

    playerScore = playerScore <= 21 ? playerScore : playerAltScore;

    this.setState({
      deck: deck,
      playerHand: playerHand,
      playerScore: playerScore,
    });
  };

  opponentTakeCard = () => {
    if (this.props.soundsOn) {
      this.getCardSound.play();
      this.getCardSound.volume = this.props.soundsVolume / 100;
    }
    const deck = [...this.state.deck];
    const card = deck.pop();
    const opponentHand = [...this.state.opponentHand];
    opponentHand.push(card);

    let opponentScore = opponentHand.reduce((acc, current) => {
      return acc + current.value;
    }, 0);

    let opponentAltScore = opponentHand.reduce((acc, current) => {
      return acc + current.altValue;
    }, 0);
    opponentScore = opponentScore <= 21 ? opponentScore : opponentAltScore;

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
    let {
      isOpponentTurn,
      isGameOver,
      deck,
      playerHand,
      opponentHand,
      opponentScore,
      playerScore,
    } = this.state;
    if (deck.length === 0) {
      alert("Deck is empty");
      this.restart();
    }
    return (
      <div className="game-mode">
        <div className="game-field">
          <div className="card-place"></div>
          <div className="card-place"></div>
          <div className="card-place"></div>

          <img src={cardBackSide} alt="card-backside" className="card-size" />
          <img src={cardBackSide} alt="card-backside" className="card-size" />
        </div>
        <div className="player-hand">
          {playerHand.map((card) => {
            return <img src={card.src} alt="card" className="card card-size" />;
          })}
        </div>
        <div className="opponent-hand">
          {opponentHand.map((card) => {
            return (
              <img
                src={card.src}
                alt="card"
                className="card  card-size"
                key={card.src}
              />
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
        {isGameOver ? <button onClick={this.restart}>repeat</button> : null}
        <div className="score">
          <label>
            Opponent score
            <input value={opponentScore} disabled={true} type="text" />
          </label>
          <label>
            Your score
            <input value={playerScore} disabled={true} type="text" />
          </label>
        </div>
      </div>
    );
  }
}

export { Log, StartGame };
