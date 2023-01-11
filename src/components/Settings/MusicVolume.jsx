export default function MusicVolume(props) {
  return (
    <div className="slider-parent">
      <label>
        Music volume
        <input
          type="range"
          min="1"
          max="100"
          value={props.musicVolume}
          onChange={props.changeMusicVolume}
        />
      </label>
    </div>
  );
}
