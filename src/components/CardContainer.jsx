import "../styles/CardContainer.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function CardContainer({
  setScore,
  currentScore,
  setLevel,
  currentLevel,
  setHighscore,
  currentHighscore,
}) {
  const [sourceIds, setSourceIds] = useState(selectPokemonId(1));
  const [imageSources, setImageSources] = useState([]);
  const [lost, setLost] = useState(false);
  let pickedCardsId = useRef([]);

  useEffect(() => {
    let ignore = false;
    setImageSources([]);

    if (!ignore) {
      const sources = [];
      const ids = sourceIds;
      const promises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
          mode: "cors",
        }).then((response) => response.json())
      );
      Promise.all(promises).then((datas) => {
        datas.forEach((data) => sources.push(data));
        setImageSources(sources);
      });
    }

    return () => {
      ignore = true;
    };
  }, [sourceIds]);

  function handleCardChoose(id) {
    if (pickedCardsId.current.includes(id)) {
      pickedCardsId.current = [];
      setLost(true);
      setScore(0);
      setLevel(1);
    } else {
      const idListCopy = pickedCardsId.current.slice();
      idListCopy.push(id);
      pickedCardsId.current = idListCopy;

      const newScore = currentScore + 100 * currentLevel;
      setScore(newScore);
      if (currentHighscore < newScore) setHighscore(newScore);
    }

    const cardAmount = currentLevel < 8 ? 8 : 12;

    if (pickedCardsId.current.length >= cardAmount) {
      pickedCardsId.current = [];
      setSourceIds(selectPokemonId(currentLevel + 1));
      setLevel(currentLevel + 1);
    } else {
      setImageSources(shuffle(imageSources));
    }
  }

  function selectPokemonId(level) {
    let ids;
    const one = [1, 4, 7, 25, 50, 52, 54, 60, 66, 79, 109, 151];
    const two = [71, 123, 131, 55, 58, 27, 108, 143, 111, 20, 78, 98];
    const three = [29, 32, 37, 77, 120, 121, 12, 49, 40, 36, 106, 107];
    const four = [6, 42, 55, 146, 145, 18, 22, 83, 85, 137, 142, 144];
    const five = [5, 37, 45, 47, 59, 78, 99, 119, 120, 126, 136, 129];
    const six = [15, 26, 38, 53, 54, 65, 96, 97, 101, 125, 135, 145];
    const seven = [20, 68, 76, 82, 91, 95, 105, 112, 128, 132, 133, 137];

    const stages = [one, two, three, four, five, six, seven];

    if (level < 8) {
      const stage = stages[level - 1];
      ids = shuffle(stage).slice(0, 8);
    } else {
      const stage = stages[(level - 1) % 7];
      ids = shuffle(stage).slice();
    }

    return ids;
  }

  function shuffle(array) {
    let ids = array.slice();

    for (let i = ids.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = ids[i];
      ids[i] = ids[j];
      ids[j] = temp;
    }

    return ids;
  }

  function handleRetry() {
    setImageSources([]);
    setSourceIds(selectPokemonId(1));
    setLost(false);
  }

  function CardList({ chooseCard }) {
    return (
      <>
        {imageSources.map((source) => {
          return (
            <div
              key={source.id}
              className="card"
              onClick={() => chooseCard(source.id)}
            >
              <img
                src={
                  source.sprites.versions["generation-i"]["red-blue"]
                    .front_transparent
                }
                alt="Sprite"
              ></img>
              <p>{source.name.toUpperCase()}</p>
            </div>
          );
        })}
      </>
    );
  }

  if (lost) {
    return (
      <div className="losescreen">
        <p className="big">YOU LOSE!</p>
        <p className="small">You clicked the wrong one. Try again?</p>
        <button onClick={handleRetry}>RETRY</button>
      </div>
    );
  } else {
    return (
      <>
        {imageSources.length > 0 ? (
          <div className="cardcontainer">
            <CardList chooseCard={handleCardChoose} />
          </div>
        ) : (
          <div className="loadingbox">
            <p>LOADING LEVEL {currentLevel} ...</p>
          </div>
        )}
      </>
    );
  }
}

export default CardContainer;
