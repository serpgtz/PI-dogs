import React, {useEffect} from "react";
import {getDogById} from "../action"
import { useDispatch, useSelector } from "react-redux";
import { Link  } from "react-router-dom";
import s from "./Detail.module.css"






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

                <div className={s.detail}>
                    <img className={s.image} src={dog[0].image} width="350x" weight="250px"/>
                    {console.log(dog[0].image)}
                    <h1>Nombre: {dog[0].name}</h1>
                    <h4>Peso: {dog[0].weight}</h4>
                    <h4>Altura: {dog[0].height}</h4>
                    <h4>Esperanza de Vida: {dog[0].life_span}</h4>
                    <h4>Temperamentos: {dog[0].hasOwnProperty("temperamentos")?dog[0].temperamentos.map(t=>t.name +","):dog[0].temperament}</h4>



                </div>:<p>Loadig...</p>
            }
            <div className={s.divbuttom}>
                <Link to={"/home"}>
                    <fragment className={s.homeb}>
                    <button className={s.button}>Home</button>
                    </fragment>
                </Link>
           </div>

        </div>
    )
}