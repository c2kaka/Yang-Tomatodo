import React from "react";
import {Button,Input} from "antd";
import TomatoCountDown from "./TomatoCountDown";

interface ITomatoActionProps {
    startTomato: () => any;
    getUnCompletedTomato: () => any;
    postTomato: (id:number,params:any) => any;
}

interface ITomatoActionState {
    description: string
}

class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState> {

    constructor(props){
        super(props);
        this.state={
            description: ''
        }
    }

    onPressEnter = () => {
        const id=this.props.getUnCompletedTomato().id;
        const params={
            description:this.state.description,
            ended_at:new Date()
        };
        this.props.postTomato(id,params);
        this.setState({description:''});
    };

    render() {
        let html = <div>html</div>;
        if(!this.props.getUnCompletedTomato()){
            html = <Button className="startTomatoBtn" onClick={this.props.startTomato}>开始番茄</Button>
        }else {
            const unCompletedTomato = this.props.getUnCompletedTomato();
            const startAt = Date.parse(unCompletedTomato.started_at);
            const duration = unCompletedTomato.duration;
            const timeNow = new Date().getTime();
            if(timeNow - startAt > duration){
                html = <Input
                    placeholder="您刚才完成了什么任务？"
                    value={this.state.description}
                    onChange={ e => this.setState({description:e.target.value})}
                    onPressEnter={this.onPressEnter}
                />
            }else{
                html= <TomatoCountDown />
            }
        }

        return (
            <div className="TomatoAction">
                {html}
            </div>
        )
    }
}

export default TomatoAction