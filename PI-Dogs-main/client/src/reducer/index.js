import {GET_DOGS} from "../action/index"

const initialState = {
    dogs:[]
} 

export default function reducer(state = initialState, action){

    switch (action.type) {
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload
            }
            
            
    
        default:
            return state;
    }

}



