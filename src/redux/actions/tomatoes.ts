import {ADD_TOMATO,INIT_TOMATOES,POST_TOMATO} from "../actionTypes";

export const addTomato = (payload:any) => ({
    type: ADD_TOMATO,
    payload
});

export const initTomatoes = (payload:any[])=>({
   type: INIT_TOMATOES,
   payload
});

export const postTomato = (payload:any) => ({
    type: POST_TOMATO,
    payload
});