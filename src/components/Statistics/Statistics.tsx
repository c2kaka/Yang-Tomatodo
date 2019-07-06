import React from "react";
import "./Statistics.scss"
import {connect} from "react-redux";
import Polygon from "./Polygon"
import TodoHistory from "./TodoHistory"
import _ from "lodash";
import {format} from "date-fns";

interface IStatisticsProps {
    todos: any[];
    tomatoes: any[];
}

class Statistics extends React.Component<IStatisticsProps> {
    get completedTodos() {
        return this.undeletedTodos.filter(t => t.completed);
    }

    get undeletedTodos() {
        return this.props.todos.filter(t => !t.deleted);
    }

    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at));
    }

    get dailyTodos() {
        return _.groupBy(this.completedTodos,todo=>{
            return format(todo.updated_at,"YYYY-MM-DD");
        });
    }

    render() {
        return (
            <div className="Statistics">
                <ul>
                    <li>统计</li>
                    <li>目标</li>
                    <li>番茄历史</li>
                    <li>
                        <div className="summary">
                            <p className="title">任务历史</p>
                            <p className="subtitle">累计完成任务</p>
                            <p className="amount">{this.completedTodos.length}</p>
                        </div>
                        <Polygon compltedTodos={this.completedTodos} dailyTodos={this.dailyTodos}/>
                    </li>
                </ul>
                <TodoHistory dailyTodos={this.dailyTodos} deletedTodos={this.deletedTodos}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos:state.todos,
    tomatoes:state.tomatoes,
    ...ownProps
});


export default  connect(mapStateToProps,null)(Statistics)