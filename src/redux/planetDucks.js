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
// Función que recibe dos parametros el primero es el metodo que nos provee la función donde la vamos a usar y el segundo es el 'response' de la consulta a la API
const favoriteLoad = (getState, res) => {
  // Obtenemos lo que se encuentra en el estado de favorites
  const favoriteLocalStorage = getState().planets.favorites;
  // Obtenemos la informacion que nos llega por la API
  const dataBase = res.data.results;
  // Recorremos los planetas que obtuvimos
  dataBase.forEach((planetDb) => {
    // Recorremos los planetas favoritos
    favoriteLocalStorage.forEach((fav) => {
      // Si en favoritos se encuentra uno de los planetas que nos viene desde la API
      if (planetDb.name.toLowerCase() === fav.name.toLowerCase()) {
        // Le agregamos una nueva propiedad con un valor true
        planetDb.favorite = true;
      }
    });
  });
};

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
  // Variable que toma como valor lo que exista en el local storage con la propiedad "pageBefore" sino existe toma el valor del string
  const page =
    JSON.parse(localStorage.getItem("pageBefore")) ||
    `https://swapi.dev/api/planets/`;
  try {
    // Variable que recive la informacion producto de la consulta a la url que trae la variable "page"
    const res = await axios.get(page);

    //Función creada en la linea 26 (Explicada)
    favoriteLoad(getState, res);

    // Función que nos provee el callback de la función actual para disparar la modificación actual del estado
    dispatch({
      // Tipo de acción
      type: PLANETS_ALL,
      // Carga enviada al reducer
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA SIGUIENTE PAGINACIÓN */
export const nextPageAction = () => async (dispatch, getState) => {
  try {
    // Variable que recibe el valor que se encuentra en el estado actual en la propiedad 'next'
    const nextPage = getState().planets.next;

    const res = await axios.get(
      // Si existe algo en la variable nextPage hace la consulta a esa informacion sino en la url entre ""
      nextPage ? nextPage : "https://swapi.dev/api/planets/"
    );

    // Función creada en la linea 26 (Explicada)
    favoriteLoad(getState, res);

    // Guardamos en el almacenamiento local una propiedad con el valor de la variable nextPage
    // Esto nos sirve para que no se pierda el estado actual de la paginacion en la que nos encontramos actualmente
    localStorage.setItem("pageBefore", JSON.stringify(nextPage));

    dispatch({
      type: PLANETS_NEXT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA PAGINACION ANTERIOR */

// Explicado anteriormente en la función anterior
export const prevPageAction = () => async (dispatch, getState) => {
  try {
    const prevPage = getState().planets.prev;

    const res = await axios.get(
      prevPage ? prevPage : "https://swapi.dev/api/planets/"
    );

    favoriteLoad(getState, res);

    localStorage.setItem("pageBefore", JSON.stringify(prevPage));

    dispatch({
      type: PLANETS_PREV,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

/* FUNCIÓN PARA LA BUSQUEDA POR NOMBRE DE PLANETAS */

//Función que recibe un parametro value que representa la valor del input al momento de realizar la busqueda
export const searchPlanetsAction = (value) => async (dispatch, getState) => {
  const res = await axios.get(`https://swapi.dev/api/planets/?search=${value}`);

  // Función creada en la linea 26 (Explicada)
  favoriteLoad(getState, res);

  dispatch({
    type: PLANETS_SEARCH,
    payload: {
      // Resultado de la busqueda enviada al reducer
      array: res.data.results,
      // Valor recibido desde el buscador enviado al reducer
      keyPlanet: value,
    },
  });
};

// Función recibe como parametro el nombre del planeta
export const addFavoritesAction = (name) => (dispatch, getState) => {
  // Variable que recibe como valor el estado actual de la propiedad favorites
  const favoritesState = getState().planets.favorites;

  //Variable que recibe el valor del planeta encontrado con toda sus propiedades
  const planetFavorite = getState().planets.array.find(
    (planet) => planet.name === name
  );

  // Variable que recibe un tipo de dato Set (utilizado para que existan valores unicos)
  let favoritesAll = new Set([...favoritesState, planetFavorite]);
  // Convertimos el tipo de dato Set a un Array
  favoritesAll = Array.from(favoritesAll);

  // Asignamos en el array de favoritos una nueva propiedad llamada favorite con el valor de 'true'
  favoritesAll.map((planet) => (planet.favorite = true));

  // Guardamos en el local storage los planetas agregados como favoritos con sus respectivas propiedades
  localStorage.setItem("planets-favorites", JSON.stringify(favoritesAll));

  dispatch({
    type: PLANETS_ADD_FAVORITE,
    // Enviamos al reducer el valor del array con sus planetas favoritos
    payload: favoritesAll,
  });
};

// Igual que la función anterior recibe el mismo parametro
export const removeFavoriteAction = (name) => (dispatch, getState) => {
  let favoritesState = getState().planets.favorites;
  // Recorremos el estado de favoritos
  favoritesState.forEach((planet, i) => {
    // Si en el estado actual de favoritos es igual al nombre que se recibe como parametro entonces!
    if (planet.name.toLowerCase() === name.toLowerCase()) {
      // En el planeta que esta en favorito nos ubicamos en el indice de ese planeta y lo quitamos con el metodo de array 'SPLICE'
      favoritesState.splice(i, 1);

      // Una vez que este eliminado el planeta del estado de favoritos lo guardamos en el almacenamiento local del navegador
      localStorage.setItem("planets-favorites", JSON.stringify(favoritesState));
      dispatch({
        type: PLANETS_REMOVE_FAVORITE,
        // Enviamos el array favorites con la nueva modificación
        payload: favoritesState,
      });
    }
  });
};
