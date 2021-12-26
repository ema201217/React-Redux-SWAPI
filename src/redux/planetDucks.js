/* EN ESTE REDUCER SE USO LA METODOLOGIA DE DESARROLLO Ducks: Redux Reducer Bundles 
 https://github.com/erikras/ducks-modular-redux#the-proposal */

import axios from "axios";

//CONSTANTE DE COMO SERA EL ESTADO INICIAL DE NUESTRO REDUCER
const dataInitial = {
  array: [],
  next: "",
  prev: "",
  keyPlanet: "",
  favorites: JSON.parse(localStorage.getItem("planets-favorites")) || [],
};

//types - TIPOS DE ACCIONES QUE TIENE NUESTRA APLICACIÓN
const PLANETS_ALL = "PLANETS_ALL";
const PLANETS_NEXT = "PLANETS_NEXT";
const PLANETS_PREV = "PLANETS_PREV";
const PLANETS_SEARCH = "PLANETS_SEARCH";
const PLANETS_ADD_FAVORITE = "PLANETS_ADD_FAVORITE";
const PLANETS_REMOVE_FAVORITE = "PLANETS_REMOVE_FAVORITE";


//Functions All
const favoriteLoad = (getState,res) =>{
  const favoriteLocalStorage = getState().planets.favorites
  const dataBase = res.data.results
  dataBase.forEach(planetDb => {
    favoriteLocalStorage.forEach(fav=>{
      if(planetDb.name.toLowerCase() === fav.name.toLowerCase()){
        planetDb.favorite = true
      }
    })
  })
}

//reducer - CONFIGURACIÓN DE NUESTRO REDUCER PARA LOS DISTINTOS TIPOS DE CASOS
export default function PlanetReducer(state = dataInitial, action) {
  switch (action.type) {
    case PLANETS_ALL:
    case PLANETS_NEXT:
    case PLANETS_PREV:
      return {
        ...state,
        array: action.payload.results,
        next: action.payload.next,
        prev: action.payload.previous,
      };
    case PLANETS_SEARCH:
      return {
        ...state,
        array: action.payload.array,
        keyPlanet: action.payload.keyPlanet,
      };
    case PLANETS_ADD_FAVORITE:
    case PLANETS_REMOVE_FAVORITE:
      return {
        ...state,
        favorites: action.payload,
      };
    default:
      return state;
  }
}

//actions - TODAS LAS FUNCIONES QUE SE VAN A EJECUTAR DEPENDIENDO EL CASO AL QUE SE UTILICE

/* FUNCION EXPORTADA QUE NOS OBTIENE LOS PRIMEROS 10 PLANETAS */
export const getPlanetsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/planets/`);

    favoriteLoad(getState,res)

    dispatch({
      type: PLANETS_ALL,
      payload:res.data
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA SIGUIENTE PAGINACIÓN */
export const nextPageAction = () => async (dispatch, getState) => {
  try {
    let nextPage = getState().planets.next;

    const res = await axios.get(
      nextPage ? nextPage : "https://swapi.dev/api/planets/"
    );

    favoriteLoad(getState,res)
  
    dispatch({
      type: PLANETS_NEXT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA PAGINACION ANTERIOR */
export const prevPageAction = () => async (dispatch, getState) => {
  try {
    let prevPage = getState().planets.prev;

    const res = await axios.get(
      prevPage ? prevPage : "https://swapi.dev/api/planets/"
    );

    favoriteLoad(getState,res)

    dispatch({
      type: PLANETS_PREV,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA LA BUSQUEDA POR NOMBRE DE PLANETAS */
export const searchPlanetsAction = (value) => async (dispatch, getState) => {
  const res = await axios.get(`https://swapi.dev/api/planets/?search=${value}`);

  favoriteLoad(getState,res)

  dispatch({
    type: PLANETS_SEARCH,
    payload: {
      array: res.data.results,
      keyPlanet: value,
    },
  });
};

export const addFavoritesAction = (name) => (dispatch, getState) => {

  const favoritesState = getState().planets.favorites;

  const planetFavorite = getState().planets.array.find(
    (planet) => planet.name === name
  );

  let favoritesAll = new Set([...favoritesState, planetFavorite]);
  favoritesAll = Array.from(favoritesAll);
  console.log(favoritesAll);

  favoritesAll.map(planet=>planet.favorite = true)

  localStorage.setItem("planets-favorites", JSON.stringify(favoritesAll));

  dispatch({
    type: PLANETS_ADD_FAVORITE,
    payload: favoritesAll,
  });
};

export const removeFavoriteAction = (name) => (dispatch, getState) => {
  let favoritesState = getState().planets.favorites;
  favoritesState.forEach((planet, i) => {
    if (planet.name.toLowerCase() === name.toLowerCase()) {
      favoritesState.splice(i, 1);
      localStorage.setItem("planets-favorites", JSON.stringify(favoritesState));
      console.log(favoritesState);
  
      dispatch({
        type: PLANETS_REMOVE_FAVORITE,
        payload: favoritesState,
      });
    }

  });
};
