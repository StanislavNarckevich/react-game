import { render } from "@testing-library/react";
import { Component } from "react";
import { Helmet } from "react-helmet";
import MainMenu from "../Main-menu/Main-menu";
import MenuBtn from "../MenuBtn/MenuBtn";
import Music from "../Sound/Sound";
import { StartGame, Log } from "../NewGame/NewGame";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: {
        isMenu: true,
        isGame: false,
        isStats: false,
        isSettings: false,
        isLog: false,
        isRules: false,
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
    // cloneFlags[restMode] = true;
    console.log(cloneFlags);
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
    console.log(this.state);
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
      </div>
    );
  }
}

export default App;
