import React from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "./TodoItem";
import "./Todos.scss"

interface ITodosState {
    todos: any[];
}

class Todos extends React.Component <any, ITodosState> {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    addTodo = async (params: any) => {
        const {todos} = this.state;
        try {
            const response = await axios.post("todos", params);
            this.setState({todos: [response.data.resource, ...todos]});
        } catch (e) {
            throw new Error(e);
        }
    };

    async componentDidMount() {
        await this.getTodos();
    }

    getTodos = async () => {
        try {
            const response = await axios.get("todos");
            const todos = response.data.resources;
            const newTodos=todos.map(t=>
                Object.assign({},t,{editable:false})
            );
            this.setState({todos:newTodos});
        } catch (e) {
            throw new Error(e);
        }
    };

    updateTodos = async (id:number,params:any) => {
        const {todos} = this.state;
        try {
            const response = await axios.put(`todos/${id}`,params);
            const newTodos = todos.map(t=>{
                if(t.id === id){
                    return response.data.resource;
                }else{
                    return t;
                }
            });
            this.setState({todos:newTodos})
        }
        catch (e) {
            throw new Error(e);
        }
    };

    setEditable = (id:number) => {
      const {todos}  = this.state;
      const newTodos=todos.map(t=>{
          if(t.id === id){
              return Object.assign({},t,{editable:true})
          }else {
              return Object.assign({},t,{editable:false})
          }
      });
      this.setState({todos:newTodos});
    };

    render() {
        return (
            <div className="todos" id="todos">
                <TodoInput addTodo={(params) => this.addTodo(params)}/>
                <main>
                    <ul>
                        {this.state.todos.map(t => {
                            return <TodoItem key={t.id} {...t}
                                             updateTodos={(id,params) => {this.updateTodos(id,params)} }
                                             setEditable={id=>this.setEditable(id)}
                            />
                        })
                        }

                    </ul>
                </main>
            </div>
        )
    };
}

export default Todos