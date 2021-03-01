export default function SetDifficulty(props) {
  return (
    <div className="">
      <span>Difficulty</span>
      <select name="select" onChange={props.toggleScorePanel}>
        <option value={1} selected={props.showScorePanel ? true : false}>
          Play with score panel
        </option>
        <option value={0} selected={!props.showScorePanel ? true : false}>
          Play without score panel
        </option>
      </select>
    </div>
  );
}
