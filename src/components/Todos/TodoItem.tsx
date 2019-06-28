import React from "react";
import {Checkbox, Input, Icon} from 'antd';
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

    updateContent = () => {
      if(this.state.editText !== ''){
          this.updateTodos({description: this.state.editText});
      }
    };

    render() {
        const Editing = (
            <Input value={this.state.editText}
                   suffix={<span>
                       <Icon type="enter" onClick={this.updateContent}/>
                       <Icon type="delete" theme="filled" onClick={e=>this.updateTodos({deleted:true})}/>
                   </span>}
                   onChange={e => {
                       this.setState({editText: e.target.value})
                   }}
                   onPressEnter={this.updateContent}
            />
        );

        const Text = <span onDoubleClick={this.setEditable}>{this.props.description}</span>;
        return (
            <div className="TodoItem">
                <Checkbox checked={this.props.completed}
                          onChange={e => this.updateTodos({completed: e.target.checked})}/>
                {this.props.editable ? Editing : Text}
            </div>
        )
    }
}

export default TodoItem