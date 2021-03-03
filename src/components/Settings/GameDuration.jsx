export default function GameDuration(props) {
  return (
    <div className="">
      <span>Duration of the game</span>
      <select name="select" onChange={props.toggleGameDuration}>
        <option
          value={10}
          selected={props.gameDuration === "10" ? true : false}
        >
          10 wins
        </option>
        <option
          value={20}
          selected={props.gameDuration === "20" ? true : false}
        >
          20 wins
        </option>
        <option
          value={50}
          selected={props.gameDuration === "50" ? true : false}
        >
          50 wins
        </option>
      </select>
    </div>
  );
}
