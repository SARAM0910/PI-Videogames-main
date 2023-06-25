import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../redux/Actions";

export default function SearchBar(){

    const dispatch = useDispatch()
    const [name,setname] = useState ('')

    function handleInputChange(e){
        e.preventDefault()
        let inputValue = e.target.value

        setname(inputValue)
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(searchByName(name))
        setname('')
    }

    return(
        <div>
            <input type ='text' placeholder=" Search by name...." onChange={handleInputChange}/>
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}