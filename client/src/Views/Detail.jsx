import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../redux/Actions";


// Función para eliminar etiquetas HTML de un texto
function stripHtmlTags(html) { 
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

  // regex de  etiquetas HTML /<[^>]+>/g

export default function Detail(){

    const dispatch = useDispatch()
    const {id} = useParams()

    const {detail} = useSelector((state)=>state)


    useEffect(()=>{
        dispatch(getVideogameById(id))
    },[dispatch,id])

    if (!detail) {
        return <div>Loading...</div>;
      }

      const {
        name,
        description,
        image,
        released,
        rating,
        genre,
        genres,
        platform,
        platforms
               
      }=detail

      const genreList = genre?genre.join(' - '):genres?.map(el=>el.name).join(' - ')
      const platformList = platform?platform.join(' - '): platforms?.map(el=>el.name).join(' - ')// para que el renderizado funcione me toca revisar si tanto platform como platforms no son undefine
      
      const strippedDescription = stripHtmlTags(description) // Elimino etiquetas HTML de la descripción

    
  
    return(

        <div>
            <div>
                <Link to='/Home'>X</Link>
            </div>
            <div>
            <div>
                    <h1>Name: {name}</h1>
                    </div>
                    <div>
                    <img src={image} alt={name} />
                    </div>
                    <div>
                    <h3>Platforms: {platformList}</h3>
                    <h3>Description: {strippedDescription}</h3>
                    <h3>Release: {released}</h3>
                    <h3>Rating: {rating}</h3>
                    <h3>Genres: {genreList}</h3>
                    </div>
            </div>
        </div>

    )       
        
}