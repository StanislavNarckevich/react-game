import { render } from "@testing-library/react";
import { Component } from "react";
import { Helmet } from "react-helmet";
import MainMenu from "../Main-menu/Main-menu";
import MenuBtn from "../MenuBtn/MenuBtn";
import Music from "../Sound/Sound";
import NewGame from "../NewGame/NewGame";

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
      },
    };
  }

  resetFlags = (mode) => {
    const cloneFlags = JSON.parse(JSON.stringify(this.state.flags));
    for (let key in cloneFlags) {
      cloneFlags[key] = false;
    }
    cloneFlags[mode] = true;
    console.log(cloneFlags);
    return this.setState({
      flags: cloneFlags,
    });
  };

  handleMenuBtn = () => {
    this.resetFlags("isMenu");
  };

  handleNewGameBtn = () => {
    this.resetFlags("isGame");
  };
  handleStatsBtn = () => {
    this.resetFlags("isStats");
  };
  handleSettingsBtn = () => {
    this.resetFlags("isSettings");
  };

  render() {
    let { isMenu, isGame, isSettings, isStats } = this.state.flags;
    return (
      <div>
        <Helmet>
          <title>Card-game</title>
        </Helmet>
        <MenuBtn menuBtnChange={this.handleMenuBtn} />
        <Music />
        {isMenu ? (
          <MainMenu
            newGameBtnChange={this.handleNewGameBtn}
            statsBtnChange={this.handleStatsBtn}
            settingsBtnChange={this.handleSettingsBtn}
          />
        ) : null}
        {isGame ? <NewGame /> : null}
      </div>
    );
  }
}

export default App;
