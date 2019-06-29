import React from "react";
import {Checkbox, Icon} from 'antd';
import classNames from 'classnames';
import "./TodoItem.scss"
interface ITodoItemProps {
    description: string;
    completed: boolean;
    updateTodos: (id: number, params: any) => void;
    id: number;
    editable: boolean;
    setEditable: (id: number) => void;
}

interface ITodoItemState {
    editText: string;
}

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {
    constructor(props) {
        super(props);
        this.state = {
            editText: this.props.description
        }
    }

    updateTodos = (params: any) => {
        this.props.updateTodos(this.props.id, params);
    };

    setEditable = () => {
        this.props.setEditable(this.props.id);
    };

    keyUp = (e) => {
        console.log("enter keyup")
        console.log(e.keyCode)
        if(e.keyCode === 13){

            this.updateContent();
        }
    };

    updateContent = () => {
      if(this.state.editText !== ''){
          this.updateTodos({description: this.state.editText});
      }
    };

    render() {
        const Editing = (
            <div className="editing">
                <input type="text" value={this.state.editText}
                       onChange={e => {this.setState({editText: e.target.value})}}
                       onKeyUp={this.keyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" onClick={this.updateContent} />
                    <Icon type="delete" theme="filled" onClick={e=>this.updateTodos({deleted:true})}/>
                </div>
            </div>
        );

        const Text = <span className='text' onDoubleClick={this.setEditable}>{this.props.description}</span>;
        const todoItemClass=classNames({
            TodoItem: true,
            editing: this.props.editable,
            completed: this.props.completed
        });

        return (
            <div className={todoItemClass}>
                <Checkbox checked={this.props.completed}
                          onChange={e => this.updateTodos({completed: e.target.checked})}/>
                {this.props.editable ? Editing : Text}
            </div>
        )
    }
}

export default TodoItem