import React from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import "./Todos.scss"

class Todos extends React.Component {
    addTodo = async (params:any) => {
        try{
            const response = await axios.post("todos",params);
            console.log(response);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    render() {
        return (
            <div className="todos" id="todos">
                <TodoInput addTodo={(params) => this.addTodo(params)}/>
            </div>
        )
    }
}

export default Todos