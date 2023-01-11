import "./MenuBtn.scss";

export default function MenuBtn(props) {
  return (
    <button onClick={props.menuBtnChange} className="MenuBtn">
      Menu
    </button>
  );
}
