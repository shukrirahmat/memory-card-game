import "./CardContainer.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function CardContainer() {
  const [imageSources, setImageSources] = useState([]);
  const [score, setScore] = useState(0);
  let pickedCardsId = useRef([]);


  useEffect(() => {
    let ignore = false;
    setImageSources([]);

    if (!ignore) {
      const sources = [];
      const ids = [1, 4, 7, 18, 23, 25, 42, 45, 54, 62 , 66, 73, 74, 80, 94, 96, 99, 103, 108, 113, 118, 123, 139, 151]

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

    return () => {ignore = true};
  }, []);

  function handleCardChoose(id) {
    if (pickedCardsId.current.includes(id)) {
      pickedCardsId.current = [];
      setScore(0)
    } else {
      const idListCopy = pickedCardsId.current.slice();
      idListCopy.push(id)
      pickedCardsId.current = idListCopy;
      setScore(score + 1);
    }
  }

  function selectRandomIndex(amount) {
    let indexes = [];
    for (let i = 0; i < amount; i++) {
      let num = false;
      while (!num) {
        let possibleNum = Math.floor(Math.random() * imageSources.length);
        if (!indexes.includes(possibleNum)) num = possibleNum;
      }
      indexes.push(num);
    }
    return indexes;

  }

  function CardList({chooseCard}) {
    let randomIndexes = selectRandomIndex(12);
    let shownCards = imageSources.filter((_, index) => randomIndexes.includes(index));
    return (
      <>
      {shownCards.map((source) => {
        return (
          <div key={source.id} className="card" onClick={() => chooseCard(source.id)}>
            <img
              src={
                source.sprites.versions["generation-i"]["red-blue"]
                  .front_transparent
              }
              alt={source.name + "Sprite"}
            ></img>
            <p>{source.name.toUpperCase()}</p>
          </div>
        );
      })}
      </>
    )
  }



  return (
    <div className="cardcontainer">
      {imageSources.length > 0? (<CardList chooseCard={handleCardChoose}/>) : (<p>PLEASE WAIT</p>)}
      <p>{score}</p> 
    </div>
  );
}

export default CardContainer;
