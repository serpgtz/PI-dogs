import React, {useEffect} from "react";
import {getDogById} from "../action"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";






export default function Detail(props){
    
 const dispatch = useDispatch()


useEffect(()=>{
    dispatch(getDogById(props.match.params.id))
},[dispatch])

const dog= useSelector(state=>state.dog)



    return(
        <div>
            {
                dog.length>0 ?

                <div>
                    <img src={dog[0].image} width="200px" weight="200px"/>
                    {console.log(dog[0].image)}
                    <h1>Nombre: {dog[0].name}</h1>
                    <h4>Peso: {dog[0].weight}</h4>
                    <h4>Altura: {dog[0].height}</h4>
                    <h4>Esperanza de Vida: {dog[0].life_span}</h4>
                    <h4>Temperamentos: {dog[0].hasOwnProperty("temperamentos")?dog[0].temperamentos.map(t=>t.name +","):dog[0].temperament}</h4>



                </div>:<p>Loadig...</p>
            }
                <Link to={"/home"}>
                    <button>Home</button>
                </Link>

        </div>
    )
}