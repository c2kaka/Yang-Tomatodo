import {ADD_TODO, INIT_TODOS,UPDATE_TODOS,SET_EDITABLE} from "../actionTypes";

export const addTodo = (payload:any)=>({
  type: ADD_TODO,
  payload
});

export const initTodos = (payload:any[])=>({
    type: INIT_TODOS,
    payload
});

export const updateTodos = (payload:any)=>({
    type: UPDATE_TODOS,
    payload
});

export const setEditable = (id:number)=>({
    type: SET_EDITABLE,
    id
});


