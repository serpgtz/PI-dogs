import React, { Fragment } from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../action";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home(){
    const dispatch = useDispatch()
    const alldogs = useSelector(state=>state.dogs)
    const [pageCurrent, setPageCurrent] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = pageCurrent*dogsPerPage//8
    const indexOffirstDog = indexOfLastDog - dogsPerPage//0
    const currentDogs = alldogs.slice(indexOffirstDog,indexOfLastDog)

    const paginado = (pageNumber) => {
        setPageCurrent(pageNumber)
    }




    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handlerClick(e){
    e.preventDefault();
    dispatch(getDogs());


    }
    



    return(
        <div>
            <Link to = "/dogs">Crear Raza</Link>
            <h1>Dogs</h1>
            <button onClick={e=>{handlerClick(e)}} >
                Refresh dogs
            </button>

            <div>
                <select>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
            </div>
            <div>
                <select>
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="cre">Creados</option>
                </select>
                <Paginado dogsPerPage={dogsPerPage}
                alldogs={alldogs.length}
                paginado={paginado}/>
                {
                    currentDogs?.map(d=>{
                        console.log(alldogs)
                    return(
                        <fragment>
                      <Link to={"/home/"+ d.id}>
                        <Card name={d.name}
                        image={d.image}
                        temperament={d.temperament}
                        weight={d.weight}/>
                      </Link>
                       </fragment>
                    );
                    })
                }
            </div>
        </div>
        
    )
}