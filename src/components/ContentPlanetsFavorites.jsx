import { CardPlanet } from "./CardPlanet/CardPlanet";
import { useSelector } from "react-redux";

export const ContentPlanetsFavorites = () => {
  const favorites = useSelector((state) => state.planets.favorites);

  return (
    <div className="containerCards">
      { favorites?.map((planet, i) => <CardPlanet {...planet} key={i} />)}
    </div>
  );
};
