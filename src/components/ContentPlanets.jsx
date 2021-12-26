import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* IMPORTACIÓN DE COMPONENTES */
import { CardPlanet } from "./CardPlanet";

/* IMPORTO LAS ACCIONES (funciones) CREADAS EN EL STORAGE  */
import {
  /* ACCION PARA OBTENER LOS PRIMEROS 10 PLANETAS */
  getPlanetsAction,
  /* ACCION PARA SIGUIENTE PAGINACIÓN */
  nextPageAction,
  /* ACCION PARA PAGINACIÓN ANTERIOR */
  prevPageAction,
} from "../redux/planetDucks";


export const ContentPlanets = () => {
  /* DECLARO UNA VARIABLE Y LE ASIGNO LA EJECUCIÓN DE useDispatch */
  let dispatch = useDispatch();
  /* OBTENEMOS EL ESTADO QUE NOS DEVUELVE LA FUNCIÓN (useSelector) QUE NOS PROVEE REACT-REDUX */
  const planets = useSelector((store) => store.planets.array);

 

  /* AL MONTAR EL COMPONENTE POR PRIMERA VEZ DISPARA LA FUNCIÓN PARA OBTENER LOS PRIMEROS 10 PLANETAS */
  useEffect(() => {
    dispatch(getPlanetsAction());
  }, []);

  return (
    <>
      <div className="buttons">
        {/* ESTE BOTON NOS EJECUTA LA FUNCIÓN PARA ACCEDER A LOS SIGUIENTES 10 PLANETAS */}
        <button onClick={() => dispatch(prevPageAction())}>
          <i className="fas fa-chevron-left"></i>
          <span>Pagina anterior</span>
        </button>

        {/* ESTE BOTON NOS EJECUTA LA FUNCIÓN PARA ACCEDER A LOS 10 PLANETAS ANTERIORES */}
        <button onClick={() => dispatch(nextPageAction())}>
          <span>Pagina siguiente</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="containerCards">
        {/* RECORREMOS LOS PLANETAS ATRAVEZ DE LA CONSTANTE planets DONDE SE ALOJA EL ESTADO (array) CREADO EN EL ARCHIVO /redux/planetDucks (inicializada en la linea 6) */}
        {planets?.map((planet, i) => (
            <CardPlanet {...planet} key={i}/>
        ))}
      </div>
    </>
  );
};
