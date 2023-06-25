import React from "react";

export default function Paginado ({videogamePerPage,allVideogames,paginado}){
    const pageNumbers =[]

    for (let i = 0; i< Math.ceil(allVideogames/videogamePerPage); i++) {
        pageNumbers.push(i+1)
        
    }

    return(
        <nav>
        <ul>
          {pageNumbers.map((number) => {
            return (
                <li key={number}>
                <a href={`#${number}`} onMouseDown={() => paginado(number)}> 
                {/* onMouseDown e activa cuando se presiona un botón del mouse mientras el cursor está sobre el elemento con el onclick no me funciono */}
                  {number}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }