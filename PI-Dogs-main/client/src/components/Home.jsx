
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, ordenDogs, apiOrbs,getTemperamentos, ordenByTemperament, ordenByRaza, OrdenPeso } from "../action";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "./Home.module.css"
import logo from "../logo/cooltext415660571579437.png"





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

    const temperamentos = useSelector(state=>state.temperamentos)
    const dogs = useSelector(state=>state.allDogs)

    const paginado = (pageNumber) => {
        setPageCurrent(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getTemperamentos())
    },[])

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
    function handleTemp(e){
        e.preventDefault()
        setPageCurrent(1)
        dispatch(ordenByTemperament(e.target.value))
    }

    function handleRaza(e){
        e.preventDefault()
        setPageCurrent(1)
        dispatch(ordenByRaza(e.target.value))
    }
    function handlePeso(e){
        e.preventDefault()
        setPageCurrent(1)
        dispatch(OrdenPeso(e.target.value))
        setOrden(e.target.value)

    }

    


    return(
        <div className={s.home}>
            < fragment className={s.crear}>
            <Link className={s.crear} to = "/dogs">Crear Raza</Link>
            </fragment>
            <div className={s.logo}>
            
            </div>
           
          <div className={s.divButtom}>
            <button onClick={e=>{handlerClick(e)}} >
                Refresh dogs
            </button>
            </div>
        
            <div className={s.filOrden}>
                <label>Orden alfabetico: </label>
                <select onChange={e=>{handlerOrden(e)}}>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
            </div>
            <div>
            <div className={s.apiOrcre}>
            <label>Creados o Api: </label>
                <select onChange={e=>{handlerSelect(e)}}>
                    <option value={valueCreate}>{`${valueCreate}`}</option>
                    <option value="api">Existentes</option>
                    <option value="cre">Creados</option>
                </select>
            </div>
             <div className={s.temperamentos}>
                <label>Temperamentos: </label>
                <select onChange={e=>{handleTemp(e)}}>
                    <option value="todos">Todos</option>
                   
                    {   
                        temperamentos?.map(t=>{
                        return(
                            <option value={t.name}>{t.name}</option>
                        )
                           
                        })
                    }
                </select>
            <div className={s.razas}>
                <label>Razas: </label>
                <select onChange={e=>{handleRaza(e)}}>
                    <option value="todos">Todos</option>
                   {
                    dogs?.map(d=>{
                        return(
                            <option value={d.name}>{d.name}</option>
                        )
                    })

                   }
                   
                </select>
                <div className={s.peso}>
                    <label>Peso: </label>
                    <select onChange={e=>{handlePeso(e)}}>
                        <option value="asc">Acendente</option>
                        <option value="des">Decendente</option>
                    </select>
                </div>
            </div>
            </div>
                <Paginado dogsPerPage={dogsPerPage}
                alldogs={alldogs.length}
                paginado={paginado}/>

                <SearchBar setPageCurrent={setPageCurrent}/>
              
                {
                    currentDogs?.map(d=>{
                        console.log(alldogs)
                    return(
                        <fragment className={s.dogs}>
                      <Link to={"/dogDetail/"+ d.id}>
                    <div className={s.text}>
                        <Card name={d.name}
                        image={d.image}
                        temperament={d.temperament}
                        weight={d.weight}/>
                    </div> 
                      </Link>
                       </fragment>
                    );
                    })
                }
            </div>
        </div>
        
    )
}