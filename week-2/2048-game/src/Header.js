import "./Header.css";

function Header(props) {
  console.log(props);
  return (
    <div className="Header">
      <div className="Upper_Header">
        <h1>2048</h1>
        <div className="Score_div">
          <div className="Score">
            <h4>SCORE</h4>
            <h4 className="score_num">{props.score}</h4>
          </div>
          <div className="Best">
            <h4>BEST</h4>
            <h4 className="score_num">{props.best}</h4>
          </div>
        </div>
      </div>
      <div className="Bottom_Header">
        <div className="info">
          <p>
            <strong>Play 2048 Game Online</strong>
          </p>
          <p>
            Join the numbers and get to the <strong>2048 tile!</strong>
          </p>
        </div>
        <div className="newGame">
          <button onClick={props.parentCallback}>New Game</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
