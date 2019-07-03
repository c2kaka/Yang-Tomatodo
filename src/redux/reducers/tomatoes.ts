import {ADD_TOMATO,INIT_TOMATOES,POST_TOMATO} from "../actionTypes";

export default function (state:any[]=[],action) {
    switch (action.type) {
        case ADD_TOMATO:
            return [action.payload,...state];
        case INIT_TOMATOES:
            return [...action.payload];
        case POST_TOMATO:
            return state.map(t=>{
               if(t.id === action.payload.id){
                   return action.payload;
               }else {
                   return t;
               }
            });
        default:
            return state;
    }
}