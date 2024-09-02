import "./CardContainer.css";
import { useState } from "react";
import { useEffect } from "react";

function CardContainer() {
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    const sources = [];
    const ids = Array(12)
      .fill()
      .map((_, index) => index + 1);
  
    const promises = ids.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        mode: "cors",
      }).then((response) => response.json())
    );
    Promise.all(promises).then((datas) => {
      datas.forEach((data) => sources.push(data));
      setImageSources(sources);
    });
  }, []);

  return (
    <div className="cardcontainer">
      {imageSources.map((source, index) => {
        return (
        <div key={index} className="card">
            <img src={source.sprites.versions["generation-i"]["red-blue"].front_default} alt='name'></img>
        </div>);
      })}
    </div>
  );
}

export default CardContainer;
