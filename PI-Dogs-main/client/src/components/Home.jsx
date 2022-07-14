
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, ordenDogs, apiOrbs } from "../action";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";




export default function Home(){
    const dispatch = useDispatch()
    const alldogs = useSelector(state=>state.dogs)
    console.log(alldogs.length)
    const [pageCurrent, setPageCurrent] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = pageCurrent*dogsPerPage//8
    const indexOffirstDog = indexOfLastDog - dogsPerPage//0
    const currentDogs = alldogs.slice(indexOffirstDog,indexOfLastDog)


    const [orden, setOrden] = useState("")
    const [valueCreate, setValueCreate] = useState("all")

    const paginado = (pageNumber) => {
        setPageCurrent(pageNumber)
    }




    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    function handlerClick(e){
    e.preventDefault();

    dispatch(getDogs());
    setPageCurrent(1)
    setValueCreate("all")



    }
    function handlerOrden(e){
        e.preventDefault()
        dispatch(ordenDogs(e.target.value))
        setOrden(e.target.value)
    }
    function handlerSelect(e){
        e.preventDefault()
        setPageCurrent(1)
        dispatch(apiOrbs(e.target.value))
       
       
       

    }
    



    return(
        <div>
            <Link to = "/dogs">Crear Raza</Link>
            <h1>Dogs</h1>
            <button onClick={e=>{handlerClick(e)}} >
                Refresh dogs
            </button>

            <div>
                <select onChange={e=>{handlerOrden(e)}}>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
            </div>
            <div>
                <select onChange={e=>{handlerSelect(e)}}>
                    <option value={valueCreate}>{`${valueCreate}`}</option>
                    <option value="api">Existentes</option>
                    <option value="cre">Creados</option>
                </select>
                <Paginado dogsPerPage={dogsPerPage}
                alldogs={alldogs.length}
                paginado={paginado}/>

                <SearchBar />
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