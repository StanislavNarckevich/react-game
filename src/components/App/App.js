import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { render } from "@testing-library/react";
import { Component, useCallback } from "react";
import { Helmet } from "react-helmet";
import MainMenu from "../Main-menu/Main-menu";
import MenuBtn from "../MenuBtn/MenuBtn";
import Music from "../Sound/Sound";
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

  getName = (e) => {
    this.setState({
      playerName: e.target.value,
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
        {/* <Music /> */}
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
        {isGame ? <StartGame /> : null}
        {isSettings ? (
          <Settings fullscreenBtn={this.props.fullscreenBtn} />
        ) : null}
      </div>
    );
  }
}
