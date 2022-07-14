import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTemperamentos,postDogs} from "../action/index"

function Validate(input){
    const errors = {}
    if(!input.name){
        errors.name="Falta Capturar Nombre"
    }
    else if(!input.height){
        errors.height = "Falta Capturar Altura"
    }
    else if(!input.weight){
        errors.weight = "Falta Captuar Peso"
    }
    else if(!input.life_span){
        errors.life_span="Falta Capturar Esperanza de Vida"
    }
    else if(!input.image){
        errors.image = "Falta Captuar image"
    }
    else if(!input.temperamento.length===0){
        errors.temperamento = "Falta Agregar Temperamento"
    }
}

export default function DogsCreate(){


    const dispatch = useDispatch()
    const temperamentos = useSelector(state=>state.temperamentos)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        height:"",
        weight:"",
        life_span:"",
        image:"",
        temperamento:[]
    })


    useEffect(()=>{
        dispatch(getTemperamentos())
    },[])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperamento:[...input.temperamento,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postDogs(input))
        alert("Perro Creado con Exito")
        setInput({
            name:"",
        height:"",
        weight:"",
        life_span:"",
        image:"",
        temperamento:[]
        })
    }



    return(
        <div>
            <Link to={"/home"}>
                <button>Home</button>
            </Link>
            <h1>Crear Dogs</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text"
                     value={input.name}
                     name="name"
                     onChange={handleChange}/>
                </div>
                <div>
                    <label>Altura:</label>
                    <input type="number"
                    value={input.height}
                    name="height"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Peso:</label>
                    <input type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Esperanza de Vida:</label>
                    <input type="number"
                    value={input.life_span}
                    name="life_span"
                    onChange={handleChange}/>
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}/>
                </div>
                <label>Temperamentos:</label>
                <select onChange={(e)=>handleSelect(e)}>
                    
                    <option>Todos</option>
                    {
                        temperamentos.map(t=><option value={t.name}>{t.name}</option>)
                    }
                </select>

                <ul ><li>{input.temperamento.map(c=> c +  " ,")}</li></ul>

                <button type="submit">Crear Perro</button>

            </form>
        </div>
    )



}