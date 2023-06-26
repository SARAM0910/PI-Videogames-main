import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Card.module.css"




export default function Card({ name,image,genre, genres,id}) {

const navigate = useNavigate()

let genreList = [];

  if (genre) {
    // Proviene de la API
    genreList = genre.map((g) => g).join(" - ");
  } else if (genres) {
    // Proviene de la base de datos
    genreList = genres.map((g) => g.name).join(" - ");
  }

function navigateHandler() {
  navigate(`/Detail/${id}`);
}

  return (
    <div className={style.cardContainer}>
      <h2 className={style.titleContainer} > Name: {name} </h2>
      <div className={style.imageContainer}>
        <img className={style.img}
          src={image}
          alt={name}
          onClick={navigateHandler}
          
        />
      </div>
      <div>
        <h2 className={style.genreContainer}>Genre:</h2> 
        <h2 className={style.genreContainer}>{genreList}</h2>
      </div>
    </div>
  );
}
