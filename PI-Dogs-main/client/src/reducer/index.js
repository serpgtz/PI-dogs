
import {GET_DOGS, ORDEN_DOGS, APY_OR_BD, GET_BY_NAME,POST_DOGS, GET_TEMPERAMENTOS, GET_DETAIL} from "../action/index"

const initialState = {
    dogs:[],
    allDogs:[],
    temperamentos:[],
    dog:{}
} 

export default function reducer(state = initialState, action){

    switch (action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                dogs:action.payload
            }
        case POST_DOGS:
            return{
                ...state
            }
        case GET_TEMPERAMENTOS:
            return{
                ...state,
                temperamentos:action.payload

            }
        case GET_DETAIL:
            return {
                ...state,
                dog:action.payload
            }

        case ORDEN_DOGS:
            if(action.payload==="asc"){
                let dogsOrden= state.dogs.sort((c1,c2)=>{
                      if(c1.name>c2.name){
                            return 1
                        }
                       else if(c1.name<c2.name){
                            return -1
                        }
                        else{
                            return 0;
                        }
                    })
                    
                    
                    return {
                        ...state,
                        dogs:dogsOrden
                    }
                }
                
                if(action.payload==="des"){
                    let dogsOrden= state.dogs.sort((c1,c2)=>{
                        if(c1.name>c2.name){
                            return -1
                        }
                        else if(c1.name<c2.name){
                            return 1
                        }
                        else{
                            return 0;
                        }
                    })
                    
                    
                    return {
                        ...state,
                        dogs:dogsOrden
                    }
                }
            case APY_OR_BD:
                const allDogs= state.allDogs;
                const createFilter= action.payload === "cre"?allDogs.filter(d=>d.id.length>6): allDogs.filter(d=>d.id<300)


                return {
                    ...state,
                    dogs:action.payload==="all"?allDogs:createFilter
                }
                
            
    
        default:
            return state;
    }
        

}



