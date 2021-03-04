export default function SelectTable(props) {
  return (
    <div className="">
      <span>Select table</span>
      <select name="select" onChange={props.changeTable}>
        <option
          value="red-table"
          selected={props.selectedTable === "red-table" ? true : false}
        >
          Red
        </option>
        <option
          value="green-table"
          selected={props.selectedTable === "green-table" ? true : false}
        >
          Green
        </option>
        <option
          value="blue-table"
          selected={props.selectedTable === "blue-table" ? true : false}
        >
          Blue
        </option>
      </select>
    </div>
  );
}
