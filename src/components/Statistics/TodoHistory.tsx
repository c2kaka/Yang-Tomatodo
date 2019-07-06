import React from "react";
import { Tabs } from 'antd';
import {getISODay} from "date-fns";

interface ITodoHistoryProps {
    dailyTodos: any[];
    deletedTodos : any[];
}
import TodoHistoryItem from "./TodoHistoryItem";
import "./TodoHistory.scss";


const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class TodoHistory extends React.Component<ITodoHistoryProps> {
    constructor(props){
        super(props);
    }

    get dateInfo():string[] {
        return Object.keys(this.props.dailyTodos).sort((a,b)=>{
            return Date.parse(b) - Date.parse(a);
        });
    }

    render() {
        const completedTodos = () => {
            return (
                <div className="completedTodos">
                    {
                        this.dateInfo.map(dateInfo=>{
                            const weekDays:string[] = ["周一","周二","周三","周四","周五","周六","周日"];
                            return (
                                <div className="todoHistoryItem" key={dateInfo}>
                                    <div className="title">
                                        <p className="dateInfo">
                                            <span className="date">{dateInfo}</span>
                                            <span className="weekday">{weekDays[getISODay(dateInfo)-1]}</span>
                                        </p>
                                        <p className="description">
                                            <span>完成了{this.props.dailyTodos[dateInfo].length}个任务</span>
                                        </p>
                                    </div>
                                    <div className="todosDetail">
                                        {
                                            this.props.dailyTodos[dateInfo].map(todo=>{
                                                return <TodoHistoryItem key={todo.id} todo={todo} itemType="completedTodos"/>
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        };

        const deletedTodos = () => {
            return (
                <div className="deletedTodos">
                    {
                        this.props.deletedTodos.map(todo=>{
                            return <TodoHistoryItem key={todo.id} todo={todo} itemType="deletedTodos"/>
                        })
                    }
                </div>
            )
        };

        return (
            <div className="todoHistory">
                <Tabs className="statisticsTabs" onChange={callback} type="card">
                    <TabPane tab="已完成任务" key="1">
                        {completedTodos()}
                    </TabPane>
                    <TabPane tab="已删除任务" key="2">
                        {deletedTodos()}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default TodoHistory