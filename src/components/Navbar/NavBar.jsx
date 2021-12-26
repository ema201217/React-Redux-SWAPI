/* IMPORTO LA IMAGEN DEL LOGO */
import starWars from "../../assets/images/SW.png";
/* IMPORTO LOS ESTILOS  */
import "../../assets/styles/styles.css";

/* IMPORTO LA ACCIÓN CREADA EN EL STORE CON REDUX PARA BUSCAR PLANETAS  */
import {searchPlanetsAction} from '../../redux/planetDucks'
/* IMPORTO LA FUNCIÓN QUE NOS PROVEE react-redux */
import { useDispatch } from "react-redux";
/* IMPORTO EL HOOK QUE NOS PROVEE react */
import { useRef } from "react";
import { Link } from "react-router-dom";


export const NavBar = () => {

    /* DECLARO UNA VARIABLE Y LE ASIGNO LA EJECUCIÓN DE useDispatch */
const dispatch = useDispatch()

/* DECLARO UNA VARIABLE Y LE ASIGNO LA EJERCUCIÓN DE useRef PARA OBTENER UN ELEMENTO DEL DOM */
const key = useRef()

/* FUNCIÓN QUE SE EJECUTARA EN EL EVENTO DONDE LA COLOQUEMOS */
const handleSubmit = (e) =>{
    e.preventDefault()
    /* DISPATCH EJECUTA LA ACTION CREADA EN EL storage de REDUX Y LA FUNCIÓN RECIBE COMO PARAMETRO EL VALUE DEL INPUT */
    dispatch(searchPlanetsAction(key?.current.value))
}

  return (
    <>
    <span id="google_translate_element" style={{display: "none"}}></span>
  
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="linkSW">
            <img src={starWars} alt="star wars" />
          </Link>
        </li>
        <li>
          <Link to="/">Planetas</Link>
        </li>
        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>
        <li>
          <form onSubmit={(e)=>handleSubmit(e)} className="searchbar">
            <input
              type="text"
              name=""
              placeholder="Busca un planeta"
              ref={key}
            />
            <button 
            type="submit"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </li>
      </ul>
    </nav>
    </>
  );
};
