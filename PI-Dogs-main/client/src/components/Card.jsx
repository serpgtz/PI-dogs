import React from "react";
import s from "./Card.module.css"


export default function Card({name,temperament,weight,image}){
    return(
        <div className={s.card}>
            <h3 className={s.text}>Raza: {name}</h3>
            <img src={image} width="200px" weigh="170px"/>
            <p>Temperamentos: <br/>{temperament}</p>
            <p>Peso: <br/> {weight}Lb</p>
            


        </div>
    )
}