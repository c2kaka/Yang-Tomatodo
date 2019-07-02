import {ADD_TODO,INIT_TODOS,UPDATE_TODOS,SET_EDITABLE} from "../actionTypes";

export default function (state:any[]=[],action) {
    switch (action.type) {
        case ADD_TODO:
            return [action.payload,...state];
        case INIT_TODOS:
            return [...action.payload];
        case UPDATE_TODOS:
            return state.map(t=>{
                if(t.id === action.payload.id){
                    return action.payload;
                }
                else {
                    return t;
                }
            });
        case SET_EDITABLE:
            return state.map(t=>{
                if(t.id === action.id){
                    return Object.assign({},t,{editable: true});
                }else {
                    return Object.assign({},t,{editable: false});
                }
            });
        default:
            return state;
    }
}