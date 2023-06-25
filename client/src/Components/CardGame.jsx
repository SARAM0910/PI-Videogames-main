import React from "react";
import { useNavigate } from "react-router-dom";



export default function Card({ name,image,genre,id}) {

const navigate = useNavigate()


function navigateHandler() {
  navigate(`/Detail/${id}`);
}

  return (
    <div>
      <h2 > Name: {name} </h2>
      <div>
        <img
          src={image}
          alt={name}
          onClick={navigateHandler}
        />
      </div>
      <div>
        <h2>Genre: {genre}</h2>
      </div>
    </div>
  );
}
