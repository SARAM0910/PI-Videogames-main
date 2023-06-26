import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../redux/Actions";
import style from "./Search.module.css";
import IconoSearch from "../Assets/IconoSearch.jpg";

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name,setname] = useState ('')
  



    function handleInputChange(e){
        e.preventDefault()
        let inputValue = e.target.value

        setname(inputValue)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(name));
        setname('');
      }

    


    return(
        <div className={style.linkContainer}>
            <input className={style.inputStyle} type ='text' placeholder=" Search by name...." onChange={handleInputChange}/>
            <button className={style.searchButton} type="submit" onClick={(e)=>handleSubmit(e)}>
                <img src={IconoSearch} alt="search" width='25px' height='25px'/></button>
        </div>
    )
}