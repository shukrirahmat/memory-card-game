import "./CardContainer.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function CardContainer() {
  const [randomIds, setRandomIds] = useState(selectRandomId(12))
  const [imageSources, setImageSources] = useState([]);
  const [score, setScore] = useState(0);
  let pickedCardsId = useRef([]);


  useEffect(() => {
    let ignore = false;
    setImageSources([]);

    if (!ignore) {
      const sources = [];
      const ids = randomIds;
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
  }, [randomIds]);

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

    if (pickedCardsId.current.length >= 12) {
      pickedCardsId.current = [];
      setRandomIds(selectRandomId(12));
    } else {
      setImageSources(shuffle(imageSources));
    }
  }

  function selectRandomId(amount) {
    let indexes = [];
    for (let i = 0; i < amount; i++) {
      let num = false;
      while (!num) {
        let possibleNum = Math.floor(Math.random() * 150) + 1;
        if (!indexes.includes(possibleNum)) num = possibleNum;
      }
      indexes.push(num);
    }
    return indexes;
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

  function CardList({chooseCard}) {
    return (
      <>
      {imageSources.map((source) => {
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
      {imageSources.length > 0? (<CardList chooseCard={handleCardChoose}/>) : (<p>LOADING ROUND...</p>)}
      <p>{score}</p> 
    </div>
  );
}

export default CardContainer;
