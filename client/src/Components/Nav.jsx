import React from "react";
import{useLocation} from 'react-router-dom'
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "./Nav.module.css"
import logo from "../Assets/Logo.jpg"
import iconoAdd from "../Assets/IconoAdd.jpg"
import iconoAbout from "../Assets/IconoAbout.jpg"
import iconoClose from "../Assets/IconoClose.jpg"

export default function Nav (){

    const location = useLocation();
        if (location.pathname === "/") {
            return null;
          } 

    return(
        <div className={style.navContainer}>
            <div className={style.logoContainer}>
            <img className={style.logo} src={logo} alt= 'logo' width='105px' height='105px'/>
            <h1 className={style.titleContainer}>Games Station</h1>
            </div>
            <SearchBar/>
            <div className={style.linkContainer}>
            <Link className={style.link} to='/Create'>
                <img src={iconoAdd} alt="Add" width='30px' height='30px' /> 
                Create Videogame
                </Link>
        
                <Link className={style.link} to='/About'>
                <img src={iconoAbout} alt="About" width='30px' height='30px' />
                 About us 
                </Link>

                <Link className={style.link} to='/'>
                <img src={iconoClose} alt="out" width='30px' height='30px'/>
                Out
                </Link>
                </div>
                
                   
                
        </div>
    )
}