import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../redux/Actions";
import style from "./Search.module.css";
import IconoSearch from "../Assets/IconoSearch.jpg";

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name,setName] = useState ('')
  

  console.log(name)
  



  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
}

function handleSubmit(e){
  e.preventDefault();
  if(!name) {
      alert(`Ingrese un nombre valido.
No puede contener numeros ni caracteres especiales.
No debe contener mayusculas.`);
  } else {
       dispatch(searchByName(name))
             
       setName("")
       
    } 
}
   

    return(
        <div className={style.linkContainer}>
            <input className={style.inputStyle} type ='text' value = {name} placeholder=" Search by name...." onChange={handleInputChange}/>
            <button className={style.searchButton} type="submit" onClick={handleSubmit}>
                <img src={IconoSearch} alt="search" width='25px' height='25px'/></button>
        </div>
    )
}