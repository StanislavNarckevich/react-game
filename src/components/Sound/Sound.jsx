import React, { Component } from "react";
import bgSound from "../../assets/sounds/bg-sound.mp3";
import "./Sound.scss";

class Music extends React.Component {
  constructor() {
    super();
    this.state = {
      play: false,
    };
  }
  audio = new Audio(bgSound);

  componentDidMount() {
    // this.audio.autoplay = true;
    // console.log("mount");
    // this.audio.addEventListener("ended", () => this.setState({ play: false }));
  }

  componentWillUnmount() {
    // this.audio.removeEventListener("ended", () =>
    //   this.setState({ play: false })
    // );
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };

  render() {
    this.audio.volume = this.props.musicVolume / 100;
    this.audio.loop = true;

    return (
      <div>
        <button className="Sound" onClick={this.togglePlay}>
          {this.state.play ? "Pause" : "Play music"}
        </button>
      </div>
    );
  }
}

export default Music;
