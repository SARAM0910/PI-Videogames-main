import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Landing.module.css"
import logo from "../Assets/Logo.jpg"


export default function Landing ({login, createUser}){
  const navigate = useNavigate()

  function navigateHandler (){
    navigate (`/Home`)
 }

    return (
      
          <div className={style.welcomContainer}>
            <div className={style.logoContainer}>
            <img className={style.logo} src={logo} alt= 'logo' width='105px' height='105px'/>
            <h1 className={style.titleContainer}>Games Station</h1>
            </div>
          <div className={style.titleContainer}>
          <h1> HELLO WINNER... </h1>
          </div>
          <div className={style.subTitleContainer}>
          <h1>Time to play </h1>
          </div>
          <div>
            <button className={style.startButton} onClick={navigateHandler}>START</button>
          </div>
        </div>
  
    )
}