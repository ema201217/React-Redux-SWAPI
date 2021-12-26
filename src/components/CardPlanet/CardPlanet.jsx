import {
  addFavoritesAction,
  removeFavoriteAction,
} from "../../redux/planetDucks";
import { useDispatch } from "react-redux";
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const CardPlanet = ({ name, diameter, climate, terrain, favorite }) => {

  const dispatch = useDispatch();

  const handleFavorites = ({ target }) => {
    if (target.classList.contains("fas")) {
      target.classList.remove("fas");
      target.classList.remove("active");
      target.classList.add("far");
      dispatch(removeFavoriteAction(name));
    } else if (!target.classList.contains("fas")) {
      target.classList.add("fas");
      target.classList.add("active");
      target.classList.remove("far");
      dispatch(addFavoritesAction(name));
    }
  };

  return (
    <div className="card">
      <h1>{name}</h1>
        <span className="icon">
          <i
            className={`${favorite ? "fas active" : "far"} fa-star`}
            style={{ cursor: "pointer" }}
            onClick={(event) => handleFavorites(event)}
          ></i>
        </span>
      <p>DIAMETRO: {diameter!== '0' || diameter!== 'unknown'? toThousand(diameter):'-'}</p>
      <p>CLIMA: <span className="capitalize">{climate}</span></p>
      <p>TERRENO: <span className="capitalize">{terrain}</span></p>
    </div>
  );
};
