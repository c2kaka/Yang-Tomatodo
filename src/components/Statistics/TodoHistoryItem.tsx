import React from "react";
import {format} from "date-fns";
import "./TodoHistoryItem.scss"
import {connect} from "react-redux";
import {updateTodos} from "../../redux/actions/todos";
import axios from "src/config/axios";

interface ITodoHistoryItemProps {
    todo: any;
    itemType: string;
    updateTodos: (arg0:any) => any;
}

class TodoHistoryItem extends React.Component<ITodoHistoryItemProps> {
    constructor(props){
        super(props);
    }

    updateTodos = async (params:any) => {
        try{
            const response = await axios.put(`todos/${this.props.todo.id}`,params);
            this.props.updateTodos(response.data.resource);
        }catch (e) {
            throw new Error(e);
        }
    };

    render() {
        let dateFormatText = "YYYY-MM-DD";
        let action;
        if (this.props.itemType === "completedTodos"){
            dateFormatText = "HH:mm";
            action = <div className="action">
                <span className="recoverTodo" onClick={()=>this.updateTodos({completed:false})}>恢复</span>
                <span className="deleteTodo" onClick={()=>this.updateTodos({deleted:true})}>删除</span>
            </div>
        }else if(this.props.itemType === "deletedTodos"){
            dateFormatText = "YYYY-MM-DD";
            action = <div className="action">
                <span className="recoverTodo" onClick={()=>this.updateTodos({deleted:false})}>恢复</span>
            </div>
        }
        return (
            <div className="TodoHistoryItem">
                <div className="itemDetail">
                    <span className="time">{format(this.props.todo.updated_at,dateFormatText)}</span>
                    <span className="description">{this.props.todo.description}</span>
                </div>
                {action}
            </div>
        )
    }
}

const mapDispatchToProps={
    updateTodos
};

export default connect(null,mapDispatchToProps)(TodoHistoryItem)