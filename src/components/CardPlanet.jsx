import {
  addFavoritesAction,
  removeFavoriteAction,
} from "../redux/planetDucks";
import { useDispatch } from "react-redux";

export const CardPlanet = ({ name, diameter, climate, terrain, favorite }) => {
  
    const dispatch = useDispatch();
  
    const handleFavorites = ({ target }) => {
      if (target.classList.contains("fas")) {
        target.classList.remove("fas");
        target.classList.add("far");
        dispatch(removeFavoriteAction(name));
      } else if (!target.classList.contains("fas")) {
        target.classList.add("fas");
        target.classList.remove("far");
        dispatch(addFavoritesAction(name));
      }
    };

  return (
    <div className="card">
      <h1>{name}</h1>
      <span>
        <i
          className={`${favorite ? "fas" : "far"} fa-star`}
          onClick={(event) => handleFavorites(event)}
        ></i>
      </span>
      <p>Diametro: {diameter}</p>
      <p>Clima: {climate}</p>
      <p>Terreno: {terrain}</p>
    </div>
  );
};
