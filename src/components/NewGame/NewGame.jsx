import React, {Component} from "react";
import "./NewGame.scss";
import {data as cardsData} from "./../../data";
import cardBackSide from "./../../assets/images/cards/card-back.png";
import cardSound from "../../assets/sounds/get-card.mp3";
import winSound from "../../assets/sounds/win.mp3";
import loseSound from "../../assets/sounds/lose.mp3";
import tieSound from "../../assets/sounds/tie.mp3";

function Log(props) {
    return (
        <div className="Log">
            <span>Enter your name</span>
            <input
                onChange={props.getName}
                onKeyPress={props.handleEnter}
                type="text"
                placeholder="your name"
                autoFocus={true}
            />
            {props.playerName.length > 0 ? (
                <button onClick={props.startGame}>Submit</button>
            ) : null}
        </div>
    );
}

class StartGame extends Component {
    constructor(props) {
        super(props);
        cardsData.sort(function () {
            return Math.random() - 0.5;
        });
        const deck = [...cardsData];

        if (JSON.parse(localStorage.getItem("gameState"))) {
            this.state = JSON.parse(localStorage.getItem("gameState"));
        } else {
            this.state = {
                deck: deck,
                playerName: this.props.playerName,
                playerHand: [],
                opponentHand: [],
                isOpponentTurn: false,
                isGameOver: false,
                opponentScore: 0,
                isAutoplay: false,
                playerScore: 0,
                result: "",
                cardAnimation: false,
                opponentCardAnimation: false,
                playerWins: 0,
                opponentWins: 0,
                date: new Date(),
            };
        }

    }

    getCardSound = new Audio(cardSound);
    winSound = new Audio(winSound);
    loseSound = new Audio(loseSound);
    tieSound = new Audio(tieSound);

    componentDidMount() {
        if (!this.state.playerHand.length) {
            this.newGame();
        }
        document.addEventListener("keydown", this.handleKeyPressZ);
        document.addEventListener("keydown", this.handleKeyPressX);
        document.addEventListener("keydown", this.handleKeyPressR);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressZ);
        document.removeEventListener("keydown", this.handleKeyPressX);
        document.removeEventListener("keydown", this.handleKeyPressR);
        // *****
        let statsData = [];
        if (JSON.parse(localStorage.getItem("stats-data"))) {
            statsData = JSON.parse(localStorage.getItem("stats-data"));
        }
        statsData.push(this.state);
        localStorage.setItem("stats-data", JSON.stringify(statsData));
    }

    handleKeyPressZ = (e) => {
        if (e.key == "z") {
            this.playerTakeCard();
        }
    };
    handleKeyPressX = (e) => {
        if (e.key == "x") {
            this.handleStandBtn();
        }
    };
    handleKeyPressR = (e) => {
        if (e.key == "r") {
            this.restart();
        }
    };
    newGame = () => {
        if (this.state.isAutoplay) {
            this.autoplayMode();
        } else {
            setTimeout(this.playerTakeCard, 1000);
            setTimeout(this.playerTakeCard, 1500);
        }
    };

    gameOver = () => {
        const {playerScore, opponentScore} = this.state;
        const win = () => {
            if (this.props.soundsOn) {
                this.winSound.play();
                this.winSound.volume = this.props.soundsVolume / 100;
            }
            this.setState({
                playerWins: this.state.playerWins + 1,
                isGameOver: true,
            });
            alert(
                `YOU WIN  \n Score ${this.state.playerWins} - ${this.state.opponentWins}`
            );
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
            this.setState({
                isGameOver: true,
            });
            alert(
                `TIE \n Score ${this.state.playerWins} - ${this.state.opponentWins}`
            );
        } else {
            if (this.props.soundsOn) {
                this.loseSound.volume = this.props.soundsVolume / 100;
                this.loseSound.play();
            }
            this.setState({
                opponentWins: this.state.opponentWins + 1,
                isGameOver: true,
            });
            alert(
                `YOU LOSE \n Score ${this.state.playerWins} - ${this.state.opponentWins}`
            );
        }

        if (this.state.isAutoplay) {
            this.restart();
        }

        if (this.props.gameDuration == this.state.playerWins) {
            alert(
                `GAME OVER \n YOU WIN \n Score ${this.state.playerWins} - ${this.state.opponentWins}`
            );
            this.setState({
                isAutoplay: false,
                result: "win",
            });
            this.props.gameOver();
        }

        if (this.props.gameDuration == this.state.opponentWins) {
            alert(
                `GAME OVER \n YOU LOSE \n Score ${this.state.playerWins} - ${this.state.opponentWins}`
            );
            this.setState({
                isAutoplay: false,
                result: "lose",
            });
            this.props.gameOver();
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
            cardAnimation: true,
        });

        setTimeout(() => {
            this.setState({
                cardAnimation: false,
            });
        }, 300);
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
            opponentCardAnimation: true,
        });
        setTimeout(() => {
            this.setState({
                opponentCardAnimation: false,
            });
        }, 300);
    };

    autoplayMode = () => {
        if (this.state.isAutoplay) {
            const playerScore = this.state.playerScore;
            if (playerScore < 17) {
                this.autoplayTurn();
                setTimeout(this.autoplayMode, 1000);
            } else {
                this.opponentTurn();
            }
        }
    };

    autoplayTurn = () => {
        if (this.props.soundsOn) {
            this.getCardSound.play();
            this.getCardSound.volume = this.props.soundsVolume / 100;
        }

        const deck = [...this.state.deck];
        const card = deck.pop();
        const playerHand = [...this.state.playerHand];
        playerHand.push(card);

        let playerScore = playerHand.reduce((acc, current) => {
            return acc + current.value;
        }, 0);

        let playerAltScore = playerHand.reduce((acc, current) => {
            return acc + current.altValue;
        }, 0);
        playerScore = playerScore <= 21 ? playerScore : playerAltScore;

        this.setState({
            deck: deck,
            playerHand: playerHand,
            playerScore: playerScore,
            cardAnimation: true,
        });
        setTimeout(() => {
            this.setState({
                cardAnimation: false,
            });
        }, 300);
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
        if (this.state.deck.length) {
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

    handlerAutoplayBtn = () => {
        this.setState({
            isAutoplay: !this.state.isAutoplay,
        });
        setTimeout(this.autoplayMode, 200);
    };

    render() {
        localStorage.setItem("gameState", JSON.stringify(this.state));

        let {
            isOpponentTurn,
            isGameOver,
            isAutoplay,
            deck,
            playerHand,
            opponentHand,
            opponentScore,
            playerScore,
            cardAnimation,
            opponentCardAnimation,
        } = this.state;

        if (deck.length === 0) {
            alert("Deck is empty");
            this.restart();
        }
        return (
            <div className="game-mode">
                <div className={"game-field " + this.props.table}>
                    <div className="card-place"></div>
                    <div className="card-place"></div>
                    <div className="card-place"></div>

                    <img src={cardBackSide} alt="card-backside" className="card-size"/>
                    <img
                        src={cardBackSide}
                        alt="card-backside"
                        className={`card-size ${
                            opponentCardAnimation ? "opponent-take-card-animation" : ""
                        }`}
                    />
                    <img
                        src={cardBackSide}
                        alt="card-backside"
                        className={`card-size ${
                            cardAnimation ? "take-card-animation" : ""
                        }`}
                    />
                </div>
                <div className="player-hand">
                    {playerHand.map((card) => {
                        return <img src={card.src} alt="card" className="card card-size"/>;
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
                    disabled={isAutoplay || isOpponentTurn ? true : false}
                >
                    Hit
                </button>
                <button
                    onClick={this.handleStandBtn}
                    disabled={isOpponentTurn || isAutoplay ? true : false}
                >
                    Stand
                </button>

                {isGameOver ? (
                    <button onClick={this.restart} className="restart">
                        repeat
                    </button>
                ) : null}

                <button
                    onClick={this.handlerAutoplayBtn}
                    className={`autoplayBtn ${
                        this.state.isAutoplay ? "bg-red" : "bg-green"
                    }`}
                >
                    Autoplay
                </button>

                {this.props.showScorePanel ? (
                    <div className="score">
                        <label>
                            Opponent score
                            <input value={opponentScore} disabled={true} type="text"/>
                        </label>
                        <label>
                            Your score
                            <input value={playerScore} disabled={true} type="text"/>
                        </label>
                    </div>
                ) : null}
            </div>
        );
    }
}

export {Log, StartGame};
