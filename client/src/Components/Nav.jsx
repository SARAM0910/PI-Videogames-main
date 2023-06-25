import React from "react";
import{useLocation} from 'react-router-dom'
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Nav (){

    const location = useLocation();
        if (location.pathname === "/") {
            return null;
          } 

    return(
        <div>
            <img alt= 'logo'/>
                <h1>nombre de la pagina</h1>  
                <SearchBar/>          
                <Link to='/Create'>Create Videogame</Link>
        </div>
    )
}