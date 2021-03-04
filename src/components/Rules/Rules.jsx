import "./Rules.scss";
import { data } from "../../data";

export default function Rules(props) {
  return (
    <div className="rules">
      <div className="rules-window">
        <div className="hot-keys">
          <span>Hot-keys which you can use in this app </span>
          <div>
            <span className="keys">P</span> - Play/Pause music
          </div>
          <div>
            <span className="keys">S</span> - SoundsOn/SoundsOff
          </div>
          <div>
            <span className="keys">Q</span> - Go to main menu
          </div>
          <div>
            <span className="keys">Z</span> - Take a card (in game)
          </div>
          <div>
            <span className="keys">X</span> - End turn (in game)
          </div>
          <div>
            <span className="keys">R</span> - Restart round (in game)
          </div>
        </div>
        <div className="how-play">
          <span>
            To win, you need to score 21 points or as close as possible
          </span>
          <div className="cards-rules">
            <div>
              <img src={data[0].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[0].value} points</span>
            </div>
            <div>
              <img src={data[1].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[1].value} points</span>
            </div>
            <div>
              <img src={data[2].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[2].value} points</span>
            </div>
            <div>
              <img src={data[3].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[3].value} points</span>
            </div>
            <div>
              <img src={data[4].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[4].value} points</span>
            </div>
            <div>
              <img src={data[5].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[5].value} points</span>
            </div>
            <div>
              <img src={data[6].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[6].value} points</span>
            </div>
            <div>
              <img src={data[7].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[7].value} points</span>
            </div>
            <div>
              <img src={data[8].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[8].value} points</span>
            </div>
            <div>
              <img src={data[9].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[9].value} points</span>
            </div>
            <div>
              <img src={data[10].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[10].value} points</span>
            </div>
            <div>
              <img src={data[11].src} alt="card" className="card-for-rules" />-{" "}
              <span className="rules-points">{data[11].value} points</span>
            </div>
            <div>
              <img src={data[12].src} alt="card" className="card-for-rules" />{" "}
              <span className="rules-points">11 or 1 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
