import axios from "axios";

export const ORDEN_DOGS = "ORDEN_DOGS"

export const GET_DOGS = "GET_DOGS";
export const APY_OR_BD = "APY_OR_BD"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_TEMPERAMENTOS = "GET_TEMPERAMENTOS"
export const POST_DOGS = "POST_DOGS"
export const GET_DETAIL = "GET_DETAIL"
export const ORDEN_BY_TEM = "ORDEN_BY_TEM"
export const ORDEN_BY_RAZA = "ORDEN_BY_RAZA"
export const ORDEN_PESOASC = "ORDEN_PESO"



export function getDogs(){
    return async function(dispatch){
     try {
        const dogs = await axios.get("http://localhost:3001/api/dogs")
        return dispatch({
            type:GET_DOGS,
            payload:dogs.data
        })
     } catch (error) {
        console.log(error)
     }
        
    }
}

export function getDogsByName(name){
    return function(dispatch){
        axios.get("http://localhost:3001/api/dogs?name="+name)
        .then(response=>{
            dispatch({
                type:GET_BY_NAME,
                payload:response.data
            })
        })
    }
}
    export function getTemperamentos(){
        return async function(dispatch){
            const  temperamentos = await axios.get("http://localhost:3001/api/temperamentos")
            dispatch({
                type: GET_TEMPERAMENTOS,
                payload: temperamentos.data
            })
        }
    }

    export function getDogById(id){
        return function(dispatch){
            axios.get(`http://localhost:3001/api/dogs/${id}`)
            .then(response=>{
                dispatch({
                    type:GET_DETAIL,
                    payload:response.data
                })
            })
        }
    }
    export function postDogs(payload){
        return async function(dispatch){
            console.log(payload)
           const post= await axios.post("http://localhost:3001/api/dogs", payload)
           console.log(post)
            return function (dispatch){
                dispatch({
                    type:POST_DOGS,
                })
            }
    }
}

export function ordenDogs(payload){
    return function(dispatch){
     dispatch({
         type: ORDEN_DOGS,
         payload:payload
             })
    }
    

}

export function OrdenPeso(value){
    return function(dispatch){
        dispatch({
            type:ORDEN_PESOASC,
            payload:value
        })
    }
}
export function ordenByTemperament(temp){
    console.log(temp)
    return function(dispatch){
        dispatch({
            type: ORDEN_BY_TEM,
            payload:temp
        })
       
    }
}
export function ordenByRaza(raza){
    console.log(raza)
    return function(dispatch){
        dispatch({
            type:ORDEN_BY_RAZA,
            payload:raza
        })
    }
}

export function apiOrbs(payload){
    return function(dispatch){
        dispatch({
            type: APY_OR_BD,
            payload,
        })
    }
}