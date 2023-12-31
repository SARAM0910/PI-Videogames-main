import React from "react";
import style from "./Paginado.module.css"

export default function Paginado ({videogamePerPage,allVideogames,paginado,currentPage}){
    const pageNumbers =[]

    for (let i = 0; i< Math.ceil(allVideogames/videogamePerPage); i++) {
        pageNumbers.push(i+1)
        
    }

    return(
        <nav className={style.paginado}>
        <ul>
          {pageNumbers.map((number) => {
            return (
                <li key={number}>
                <a href={`#${number}`} 
                className={number===currentPage? style.activePage : ""}
                onMouseDown={() => paginado(number)}> 
                {/* onMouseDown me activa cuando se presiona un botón del mouse mientras el cursor está sobre el elemento con el onclick no me funciono */}
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }