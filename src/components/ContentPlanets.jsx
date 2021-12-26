import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/* IMPORTACIÓN DE COMPONENTES */
import { CardPlanet } from "./CardPlanet/CardPlanet";
import { ButtonsPages } from "./ButtonsPages/ButtonsPages";

/* IMPORTO LAS ACCIONES (funciones) CREADAS EN EL STORAGE  */
import {
  /* ACCION PARA OBTENER LOS PRIMEROS 10 PLANETAS */
  getPlanetsAction,
} from "../redux/planetDucks";

export const ContentPlanets = () => {
  /* DECLARO UNA VARIABLE Y LE ASIGNO LA EJECUCIÓN DE useDispatch */
  let dispatch = useDispatch();

  /* OBTENEMOS EL ESTADO QUE NOS DEVUELVE LA FUNCIÓN (useSelector) QUE NOS PROVEE REACT-REDUX */
  let planets = useSelector((store) => store.planets.array);
  
  /* AL MONTAR EL COMPONENTE POR PRIMERA VEZ DISPARA LA FUNCIÓN PARA OBTENER LOS PRIMEROS 10 PLANETAS */
  useEffect(() => {
    dispatch(getPlanetsAction());
  }, []);

  return (
    <>
      <ButtonsPages />
      <div className="containerCards">
        {/* RECORREMOS LOS PLANETAS ATRAVEZ DE LA CONSTANTE planets DONDE SE ALOJA EL ESTADO (array) CREADO EN EL ARCHIVO /redux/planetDucks (inicializada en la linea 6) */}

        {
          planets?.map((planet, i) => (
            <CardPlanet {...planet} key={i} />
          ))
        }

      </div>
    </>
  );
};
