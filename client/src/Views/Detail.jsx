import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../redux/Actions";
import style from "./Detail.module.css"
import iconoClose from "../Assets/IconoClose.jpg"


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

      const genreList = genre?genre.join(' - '):genres?.map(el=>el.name).join(' - ')// para que el renderizado funcione me toca revisar si tanto genre como genres no son undefine
      const platformList = platform?platform.join(' - '): platforms?.map(el=>el.name).join(' - ')// para que el renderizado funcione me toca revisar si tanto platform como platforms no son undefine
      
      const strippedDescription = stripHtmlTags(description) // Elimino etiquetas HTML de la descripción

    
  
    return(

        <div className={style.cardContainer}>
            <div>
                <Link to='/Home'><img src={iconoClose} alt="close" width='35px' height='35px'/></Link>
            </div>
            <div>
            <div className={style.titleContainer}>
                    <h1 >Name: {name}</h1>
                    </div>
                    <div className={style.atributesContainer}>
                    <h3>Release: </h3>
                    <h3>{released}</h3>
                    </div>
                    
                    <div className={style.atributesContainer}>
                    <h3>Rating: </h3>
                    <h3>{rating}</h3>
                    </div>
                                        
                    <div className={style.imageContainer}>
                    <img className={style.img}src={image} alt={name} />
                    </div>
                    
                    <div className={style.atributesContainer}>
                    <h3>Platforms: </h3>
                    <h3>{platformList}</h3>
                    </div>

                    <div className={style.atributesContainer}>                   
                    <h3>Genres: </h3>
                    <h3>{genreList}</h3>
                    </div>
                    <div className={style.atributesContainer}> 
                    <h3>Description: </h3>
                    <h3 >{strippedDescription}</h3>
                    </div>

                    
            </div>
        </div>

    )       
        
}