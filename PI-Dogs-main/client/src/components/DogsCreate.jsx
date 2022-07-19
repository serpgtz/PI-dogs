import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getTemperamentos,postDogs} from "../action/index"
import s from "./DogsCreate.module.css"

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
    return  errors
}

export default function DogsCreate(){


    const dispatch = useDispatch()
    const temperamentos = useSelector(state=>state.temperamentos)
    const [errors, setErrors] = useState({});
    const history = useHistory()

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
        
        setErrors(Validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        
    }

    function handleSelect(e){
        if(input.temperamento.includes(e.target.value)){
            alert("Actividad ya Agregada")
            return false;
        }
        setInput({
            ...input,
            temperamento:[...input.temperamento,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(!input.name||!input.height||!input.weight||!input.life_span||!input.image||!input.temperamento.length){
            alert("No debe de Haber un campo en Blanco")
            return false
        }
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
        history.push("/home")
        
        
    }

    


    return(
        <div className={s.createDog}>
            <Link to={"/home"}>
                <button>Home</button>
            </Link>
            <h1>Crear Dogs</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={s.container}>
                <div className={s.nombre}>
                    <label>Nombre: </label>
                    <input className={s.input} type="text"
                     value={input.name}
                     name="name"
                    
                     onChange={handleChange}/>
                 </div>
              
                 {
                        errors.name && (
                            <p className= "error">{errors.name} </p>
                        )
                    }
               
                    
                </div>
                <div>
                  <div className={s.altura}>
                    <label >Altura:</label>
                    <input className={s.input1} type="number"
                    value={input.height}
                    name="height"
                    onChange={handleChange}/>

                    {
                        errors.height && (
                            <p className= "error">{errors.height} </p>
                        )
                    }
                 </div>
                    
                </div>
                <div>
                 <div className={s.peso}>
                    <label>Peso:</label>
                    <input className={s.input2} type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}/>

                    {
                        errors.weight && (
                            <p className= "error">{errors.weight} </p>
                        )
                    }
                </div>
                </div>
                <div>
                  <div className={s.esperanza}>
                    <label>Esperanza de Vida:</label>
                    <input className={s.input3} type="number"
                    value={input.life_span}
                    name="life_span"
                    onChange={handleChange}/>

                    {
                        errors.life_span && (
                            <p className= "error">{errors.life_span} </p>
                        )
                    }
                 </div> 
                    
                </div>
                <div>
                 <div className={s.imagen}>
                    <label>Imagen</label>
                    <input className={s.input4} type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}/>

                    {
                        errors.image && (
                            <p className= "error">{errors.image} </p>
                        )
                    }
                 </div>
                    
                </div>
                 <div className={s.temperamentos}>
                <label>Temperamentos:</label>
               
                <select className={s.tem} onChange={(e)=>handleSelect(e)}>
                    
                    <option >Todos</option>
                    {
                        temperamentos.map(t=><option value={t.name}>{t.name}</option>)
                    }
                   
                
                
                </select>
                </div>
                
              
               

                <ul ><li>{input.temperamento.map(c=> c +  " ,")}</li></ul>
              
            <div className={s.buttonC}>
                <button type="submit">Crear Perro</button>
            </div>

            </form>
        </div>
    )



}