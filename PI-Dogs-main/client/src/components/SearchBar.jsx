import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../action";







export default function SearchBar({setPageCurrent}){
    const dispatch= useDispatch()
    const [name,setName] = useState("")
    


    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogsByName(name))
        setPageCurrent(1)
        setName("")
    
        
    }


    return(
        <div>
            <input type="text"
            onChange={e=> handleInputChange(e)}
            placeholder="Buscar Perro..." value={name}/>
            <button type="submit" onClick={e=> handleSubmit(e)}>Buscar</button>
        </div>

        
        
    )
}
