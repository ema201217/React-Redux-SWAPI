import React from 'react'
import { useDispatch } from 'react-redux'

/* IMPORTO LAS ACCIONES (funciones) CREADAS EN EL STORAGE  */
import {
    /* ACCION PARA SIGUIENTE PAGINACIÓN */
    nextPageAction,
    /* ACCION PARA PAGINACIÓN ANTERIOR */
    prevPageAction,
} from "../../redux/planetDucks";


export const ButtonsPages = () => {

    const dispatch = useDispatch()

    return (
        <div className="buttons">
        {/* ESTE BOTON NOS EJECUTA LA FUNCIÓN PARA ACCEDER A LOS SIGUIENTES 10 PLANETAS */}
        <button 
        onClick={() => dispatch(prevPageAction())}
         style={{cursor:"pointer"}}
        >
          <i className="fas fa-chevron-left"></i>
          <span>Pagina anterior</span>
        </button>

        {/* ESTE BOTON NOS EJECUTA LA FUNCIÓN PARA ACCEDER A LOS 10 PLANETAS ANTERIORES */}
        <button 
        onClick={() => dispatch(nextPageAction())}
        style={{cursor:"pointer"}}
        >
          <span>Pagina siguiente</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    )
}
