import React from "react";
import {Button,Input,Icon,Modal} from "antd";
import TomatoCountDown from "./TomatoCountDown";
import "./TomatoAction.scss";

interface ITomatoActionProps {
    startTomato: () => any;
    getUnCompletedTomato: () => any;
    postTomato: (id:number,params:any) => any;
}

interface ITomatoActionState {
    description: string
}

const {confirm} = Modal;

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

    onAbortTomato = () => {
        const id=this.props.getUnCompletedTomato().id;
        const params={
            aborted: true
        };
        this.props.postTomato(id,params);
    };

    onFinish = () => {
        this.forceUpdate();
    };

    showConfirm =() => {
        confirm({
            title: '您要放弃这个番茄任务吗？',
            onOk: () => {
                this.onAbortTomato();
                document.title = `番茄闹钟`;
            },
            onCancel() {
                console.log('Cancel');
            },
            okText: '确定',
            cancelText: '取消'
        });
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
                html =<div className="inputWrapper">
                    <Input
                        placeholder="您刚才完成了什么任务？"
                        value={this.state.description}
                        onChange={ e => this.setState({description:e.target.value})}
                        onPressEnter={this.onPressEnter}
                    />
                    <Icon type="close-circle" className="abortTomato" onClick={this.showConfirm}/>
                </div>

            }else{
                const timer = duration - (timeNow - startAt);
                html= <div className="countdownWrapper">
                    <TomatoCountDown timer={timer} duration={duration} onFinish={this.onFinish}/>
                    <Icon type="close-circle" className="abortTomato" onClick={this.showConfirm}/>
                </div>
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