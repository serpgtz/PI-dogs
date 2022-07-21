
import {GET_DOGS, ORDEN_DOGS,ORDEN_PESO, APY_OR_BD, GET_BY_NAME,POST_DOGS, GET_TEMPERAMENTOS, GET_DETAIL,  ORDEN_BY_TEM,ORDEN_BY_RAZA} from "../action/index"

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
                dogs:action.payload === "no hay coincidencias"?state.allDogs:action.payload
            }
        case  ORDEN_BY_TEM:
            const dogs2= state.allDogs
            
            // const dogsFilter = dogs2.filter(t=>t.hasOwnProperty("temperament")?t.temperament.includes(action.payload):t.temperamentos.map(t=>t.temperamentos.name===action.payload))
            
            // const dogsFilter = dogs2.filter(t=>t.temperament?.includes(action.payload))
           // const dogsFilter2 = dogs2.filter(t=>t.temperamentos?.map(t=>t.name.includes(action.payload)))
             const dogsFilter =   dogs2.hasOwnProperty("temperamentos")?dogs2.filter(t=>t.temperamentos?.map(t=>t.name.includes(action.payload))):dogs2.filter(t=>t.temperament?.includes(action.payload))
                
            return {
                ...state,
                dogs:action.payload !=="todos"?dogsFilter:state.allDogs
            }

            
        case ORDEN_BY_RAZA:
            const dogs = state.allDogs
            const dogsFilter2 = dogs.filter(d=>d.name.includes(action.payload))
            return {
                ...state,
                dogs:action.payload !=="todos"?dogsFilter2:state.allDogs
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
            case ORDEN_PESO:

                if(action.payload==="asc"){
                    let dogsOrden= state.dogs.sort((c1,c2)=>{
                          if(parseInt(c1.weight.split(" ")[0])>parseInt(c2.weight.split(" ")[0])){
                                return 1
                            }
                           else if(parseInt(c1.weight.split(" ")[0])<parseInt(c2.weight.split(" ")[0])){
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
                            if(parseInt(c1.weight.split(" ")[0])>parseInt(c2.weight.split(" ")[0])){
                                return -1
                            }
                            else if(parseInt(c1.weight.split(" "))[0]<parseInt(c2.weight.split(" ")[0])){
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
              
                   
                    
                
                    
                  
                    
                        
                
                    
                    
                   



                
                    
                  
                
                   
                // console.log(dogsNumber)
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



