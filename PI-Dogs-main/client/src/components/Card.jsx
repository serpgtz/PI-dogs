import React from "react";


export default function Card({name,temperament,weight,image}){
    return(
        <div>
            <h3>Raza: {name}</h3>
            <img src={image} width="200px" weigh="200px"/>
            <h5>Temperamentos: {temperament}</h5>
            <h5>Peso: {weight}</h5>
            


        </div>
    )
}