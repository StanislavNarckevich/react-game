export default function SoundsVolume(props) {
  return (
    <div className="">
      <label>
        Sounds volume
        <input
          type="range"
          min="1"
          max="100"
          value={props.soundsVolume}
          onChange={props.changeSoundsVolume}
        />
      </label>
    </div>
  );
}
