import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <div className="title">
        <p>MEMORY GAME</p>
        <p>Pokemon Ver.</p>
      </div>
      <div className="right">
        <div className="description">
          <p>
            {" "}
            - Get points by clicking all different pokemon shown, without
            clicking the same one twice in each level
          </p>
          <p> - Once a level is finished, new set of pokemon will appear</p>
          <p> - Each level gets harder but you get bonus points!</p>
          <p> - Clicking same pokemon will resets you back to Level 1</p>
        </div>
        <div className="scoreboard">
          <p> Level : {props.level}</p>
          <p> Score : {props.score}</p>
          <p> Highscore : {props.highscore}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
