import "./CardContainer.css";
import { useState } from "react";
import { useEffect } from "react";

function CardContainer() {
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    let ignore = false;
    setImageSources([]);

    if (!ignore) {
      const sources = [];
      const ids = [18, 23, 25, 42, 45, 54, 62 , 66, 73, 74, 80, 94, 96, 99, 103, 108, 113, 118, 123, 139, 151]

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

  function CardList() {
    let randomIndexes = selectRandomIndex(12);
    let pickedCards = imageSources.filter((_, index) => randomIndexes.includes(index));
    return (
      <>
      {pickedCards.map((source) => {
        return (
          <div key={source.id} className="card">
            <img
              src={
                source.sprites.versions["generation-i"]["red-blue"]
                  .front_transparent
              }
              alt="name"
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
      {imageSources.length > 0? (<CardList/>) : (<p>PLEASE WAIT</p>)}
    </div>
  );
}

export default CardContainer;
