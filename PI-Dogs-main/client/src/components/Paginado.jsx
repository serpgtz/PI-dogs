import React from "react";
import s from "./Paginado.module.css"

export default function Paginado({dogsPerPage,alldogs,paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(alldogs/dogsPerPage); i++) {
        pageNumbers.push(i)
        
    }

    return(
        <nav className={s.paginas}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(n=>(
                    
                      <li className={s.paginado} key={n}>  
                        <a onClick={()=> paginado(n)}>{n}-</a>
                      </li>
                    ))
                }
            </ul>
        </nav>
    )


}
