import React, { Component } from "react";
import bgSound from "../../assets/sounds/bg-sound.mp3";
import "./Sounds.scss";

class Music extends React.Component {
  constructor() {
    super();
    this.state = {
      play: false,
    };
  }
  audio = new Audio(bgSound);

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
        <button className="music" onClick={this.togglePlay}>
          {this.state.play ? "Pause" : "Play music"}
        </button>
      </div>
    );
  }
}

function Sounds(props) {
  return (
    <div>
      <button className="sound" onClick={props.toggleSoundsOn}>
        {props.soundsOn ? "Sounds off" : "Sounds on"}
      </button>
    </div>
  );
}

export { Music, Sounds };
