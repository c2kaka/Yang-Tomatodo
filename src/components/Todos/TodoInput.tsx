import React from "react";
import { Input, Icon } from 'antd';
import { connect } from 'react-redux';
import { addTodo } from "../../redux/actions";
import axios from "../../config/axios";

interface ITodoInputState {
    description: string;
}

interface ITodoInputProps {
    addTodo: (params:any) => any;
}

class TodoInput extends React.Component<ITodoInputProps,ITodoInputState>{
    constructor(props){
        super(props);
        this.state={
            description: ''
        }
    }

    addTodo = async () => {
        try {
            if(this.state.description !== ''){
                const response = await axios.post("todos", {description:this.state.description});
                this.props.addTodo(response.data.resource);
                this.setState({description: ''});
            }
        } catch (e) {
            throw new Error(e);
        }
    };


    render() {
        const {description} = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span />;
        return (
            <div className="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onChange={ e => this.setState({description: e.target.value}) }
                    onPressEnter={this.addTodo}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    addTodo
};

export default  connect(null,mapDispatchToProps)(TodoInput)