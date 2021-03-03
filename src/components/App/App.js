import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { render } from "@testing-library/react";
import { Component } from "react";
import { Helmet } from "react-helmet";
import MainMenu from "../Main-menu/Main-menu";
import MenuBtn from "../MenuBtn/MenuBtn";
import { StartGame, Log } from "../NewGame/NewGame";
import Settings from "../Settings/Settings";
import { Music, Sounds } from "../Sounds/Sounds";
import Rules from "../Rules/Rules";
import Stats from "../Stats/Stats";
import rsLogo from "../../assets/images/rs_school-logo.svg";
import githubLogo from "../../assets/images/github.png";

import "./App.scss";

export default function App() {
  const handle = useFullScreenHandle();

  return (
    <div>
      <FullScreen handle={handle}>
        <AppBody fullscreenBtn={handle.enter} />
      </FullScreen>
    </div>
  );
}

class AppBody extends Component {
  constructor() {
    super();
    if (JSON.parse(localStorage.getItem("appState"))) {
      this.state = JSON.parse(localStorage.getItem("appState"));
    } else {
      this.state = {
        flags: {
          isMenu: true,
          isGame: false,
          isStats: false,
          isSettings: false,
          isLog: false,
          isRules: false,
          isStart: false,
        },
        playerName: "",
        musicVolume: 50,
        soundsOn: true,
        soundsVolume: 50,
        table: "green-table",
        showScorePanel: true,
        gameDuration: "10",
      };
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPressS);
    document.addEventListener("keydown", this.handleKeyPressQ);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPressS);
    document.removeEventListener("keydown", this.handleKeyPressQ);
  }
  resetFlags = (...mode) => {
    const cloneFlags = JSON.parse(JSON.stringify(this.state.flags));
    for (let key in cloneFlags) {
      cloneFlags[key] = false;
    }
    cloneFlags[mode] = true;
    return this.setState({
      flags: cloneFlags,
    });
  };

  handleMenuBtn = () => {
    this.resetFlags("isMenu");
    this.setState({
      playerName: "",
    });
  };

  handleNewGameBtn = () => {
    localStorage.removeItem("gameState");
    this.resetFlags("isLog");
  };
  handleResumeGameBtn = () => {
    this.resetFlags("isGame");
    console.log(this.state);
  };
  handleRulesBtn = () => {
    this.resetFlags("isRules");
  };
  handleStatsBtn = () => {
    this.resetFlags("isStats");
  };
  handleSettingsBtn = () => {
    this.resetFlags("isSettings");
  };
  handleLogBtn = () => {
    this.resetFlags("isGame");
  };
  handleKeyPressEnter = (e) => {
    if (e.key == "Enter") {
      this.setState({
        playerName: e.target.value,
      });
      this.resetFlags("isGame");
    }
  };

  handleKeyPressS = (e) => {
    if (e.key == "s") {
      this.toggleSoundsOn();
    }
  };
  handleKeyPressQ = (e) => {
    if (e.key == "q") {
      this.handleMenuBtn();
    }
  };

  toggleSoundsOn = () => {
    this.setState({ soundsOn: !this.state.soundsOn });
  };

  getName = (e) => {
    this.setState({
      playerName: e.target.value,
    });
  };

  changeMusicVolume = (e) => {
    this.setState({
      musicVolume: parseInt(e.target.value),
    });
  };

  changeGameDuration = (e) => {
    this.setState({
      gameDuration: e.target.value,
    });
  };

  changeSoundsVolume = (e) => {
    this.setState({
      soundsVolume: parseInt(e.target.value),
    });
  };

  changeTable = (e) => {
    this.setState({
      table: e.target.value,
    });
  };

  toggleScorePanel = (e) => {
    this.setState({
      showScorePanel: +e.target.value,
    });
  };

  render() {
    localStorage.setItem("appState", JSON.stringify(this.state));
    console.log(this.state);
    let {
      isMenu,
      isGame,
      isSettings,
      isStats,
      isLog,
      isRules,
    } = this.state.flags;

    return (
      <div>
        <Helmet>
          <title>Card-game</title>
        </Helmet>
        <MenuBtn menuBtnChange={this.handleMenuBtn} />

        {isMenu ? (
          <MainMenu
            newGameBtnChange={this.handleNewGameBtn}
            statsBtnChange={this.handleStatsBtn}
            settingsBtnChange={this.handleSettingsBtn}
            rulesBtnChange={this.handleRulesBtn}
            resumeGameBtn={this.handleResumeGameBtn}
          />
        ) : null}

        {isLog ? (
          <Log
            handleEnter={this.handleKeyPressEnter}
            startGame={this.handleLogBtn}
            getName={this.getName}
            playerName={this.state.playerName}
          />
        ) : null}

        {isGame ? (
          <StartGame
            soundsVolume={this.state.soundsVolume}
            soundsOn={this.state.soundsOn}
            table={this.state.table}
            showScorePanel={this.state.showScorePanel}
            gameDuration={this.state.gameDuration}
            gameOver={this.handleMenuBtn}
            playerName={this.state.playerName}
          />
        ) : null}

        {isRules ? <Rules /> : null}

        {isSettings ? (
          <Settings
            fullscreenBtn={this.props.fullscreenBtn}
            changeTable={this.changeTable}
            changeMusicVolume={this.changeMusicVolume}
            changeSoundsVolume={this.changeSoundsVolume}
            toggleGameDuration={this.changeGameDuration}
            toggleScorePanel={this.toggleScorePanel}
            musicVolume={this.state.musicVolume}
            soundsVolume={this.state.soundsVolume}
            selectedTable={this.state.table}
            showScorePanel={this.state.showScorePanel}
            gameDuration={this.state.gameDuration}
          />
        ) : null}

        {isStats ? <Stats /> : null}

        <Music musicVolume={this.state.musicVolume} />
        <Sounds
          toggleSoundsOn={this.toggleSoundsOn}
          soundsOn={this.state.soundsOn}
        />
        {isMenu ? (
          <footer>
            <a href="https://rs.school/js/">
              <img src={rsLogo} alt="rs" className="rs-logo" />
            </a>
            <a href="https://github.com/StanislavNarckevich">
              <img src={githubLogo} alt="github" className="my-git" />
            </a>
          </footer>
        ) : null}
      </div>
    );
  }
}
