/* import { useSelector } from "react-redux"; */
import { CardPlanet } from "./CardPlanet";

const planetsFavorites = JSON.parse(localStorage.getItem("planets-favorites")) || [];


export const ContentPlanetsFavorites = () => {
  return (
    <div className="containerCards">
      {planetsFavorites?.map((planet, i) => (
        <CardPlanet {...planet} key={i} />
      ))}
    </div>
  );
};
