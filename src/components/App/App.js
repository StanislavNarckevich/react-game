import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { render } from "@testing-library/react";
import { Component, useCallback } from "react";
import { Helmet } from "react-helmet";
import MainMenu from "../Main-menu/Main-menu";
import MenuBtn from "../MenuBtn/MenuBtn";
import { Music, Sounds } from "../Sounds/Sounds";
import Settings from "../Settings/Settings";
import { StartGame, Log } from "../NewGame/NewGame";

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
    };
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
    this.resetFlags("isLog");
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
  // handleKeyPress = (e) => {
  //   if (e.key == "Enter") {
  //     this.setState({
  //       playerName: e.target.value,
  //     });
  //     this.resetFlags("isGame");
  //   }
  // };
  toggleSoundsOn = () => {
    this.setState({ soundsOn: !this.state.soundsOn });
    console.log(this.state);
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

  changeSoundsVolume = (e) => {
    this.setState({
      soundsVolume: parseInt(e.target.value),
    });
  };

  render() {
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
          />
        ) : null}
        {isLog ? (
          <Log
            startGame={this.handleLogBtn}
            getName={this.getName}
            playerName={this.state.playerName}
          />
        ) : null}
        {isGame ? (
          <StartGame
            soundsVolume={this.state.soundsVolume}
            soundsOn={this.state.soundsOn}
          />
        ) : null}
        {isSettings ? (
          <Settings
            fullscreenBtn={this.props.fullscreenBtn}
            changeMusicVolume={this.changeMusicVolume}
            musicVolume={this.state.musicVolume}
            changeSoundsVolume={this.changeSoundsVolume}
            soundsVolume={this.state.soundsVolume}
          />
        ) : null}
        <Music musicVolume={this.state.musicVolume} />
        <Sounds
          toggleSoundsOn={this.toggleSoundsOn}
          soundsOn={this.state.soundsOn}
        />
      </div>
    );
  }
}
