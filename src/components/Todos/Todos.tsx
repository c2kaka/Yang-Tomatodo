import React from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "./TodoItem";
import "./Todos.scss"
import {connect} from "react-redux";
import {initTodos} from "../../redux/actions";


class Todos extends React.Component <any> {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.getTodos();
    }

    getTodos = async () => {
        try {
            const response = await axios.get("todos");
            const todos = response.data.resources;
            const newTodos = todos.map(t =>
                Object.assign({}, t, {editable: false})
            );
            this.props.initTodos(newTodos);
        } catch (e) {
            throw new Error(e);
        }
    };

    getUncompletedTodos() {
        return this.getUndeletedTodos().filter(t => !t.completed);
    }

    getCompletedTodos() {
        return this.getUndeletedTodos().filter(t => t.completed);
    }

    getUndeletedTodos() {
        return this.props.todos.filter(t => !t.deleted);
    }

    render() {
        return (
            <div className="todos" id="todos">
                {/*<TodoInput addTodo={(params) => this.addTodo(params)}/>*/}
                <TodoInput/>
                <div className="todoList">
                    {this.getUncompletedTodos().map(t => {
                        return <TodoItem key={t.id} {...t}
                                         // updateTodos={(id, params) => {
                                         //     this.updateTodos(id, params)
                                         // }}
                                         // setEditable={id => this.setEditable(id)}
                        />
                    })
                    }
                    {this.getCompletedTodos().map(t => {
                        return <TodoItem key={t.id} {...t}
                                         // updateTodos={(id, params) => {
                                         //     this.updateTodos(id, params)
                                         // }}
                                         // setEditable={id => this.setEditable(id)}
                        />
                    })
                    }
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => ({
    todos:state.todos,
    ...ownProps
});

const mapDispatchToProps = {
    initTodos
};


export default connect(mapStateToProps,mapDispatchToProps)(Todos)