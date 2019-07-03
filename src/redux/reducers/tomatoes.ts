import {ADD_TOMATO} from "../actionTypes";

export default function (state:any[]=[],action) {
    switch (action.type) {
        case ADD_TOMATO:
            return [action.payload,...state];
        default:
            return state;
    }
}