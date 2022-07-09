import axios from "axios";
export const ORDEN_DOGS = "ORDEN_DOGS"

export const GET_DOGS = "GET_DOGS";

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

export function ordenDogs(payload){
    return function(dispatch){
     dispatch({
         type: ORDEN_DOGS,
        payload:payload
             })
    }
    

}