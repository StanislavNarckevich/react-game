import "./Stats.scss";

export default function Stats(props) {
  const statsData = JSON.parse(localStorage.getItem("stats-data"));
  let data;
  if (statsData && statsData.length > 12) {
    data = statsData.slice(-12);
  } else {
    data = statsData;
  }

  return (
    <div className="stats-page">
      <div className="stats-window">
        <table>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
          {data ? (
            data.map((item) => {
              return (
                <tr>
                  <td>{item.playerName}</td>
                  <td>{item.result}</td>
                  <td>
                    {item.playerWins} - {item.opponentWins}
                  </td>
                  <td>{item.date}</td>
                </tr>
              );
            })
          ) : (
            <div>Empty</div>
          )}
        </table>
      </div>
    </div>
  );
}
