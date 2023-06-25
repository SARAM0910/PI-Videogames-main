import React from "react";
import { useNavigate } from "react-router-dom";


export default function Landing ({login, createUser}){
  const navigate = useNavigate()

  function navigateHandler (){
    navigate (`/Home`)
 }

    return (
        <div>
          <h1> bienvenidos</h1>
          <div>
            <button onClick={navigateHandler}>GET STARTED</button>
          </div>
        </div>
    )
}