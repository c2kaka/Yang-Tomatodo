import React from "react";
import "./TomatoCountDown.scss";

interface ITomatoCountDownProps {
    timer: number;
    onFinish: ()=> void;
    duration: number;
}

interface ITomatoCountDownState {
    countdown: number;
}

let timerID:number;

class TomatoCountDown extends React.Component<ITomatoCountDownProps,ITomatoCountDownState> {
    constructor(props) {
        super(props);
        this.state={
            countdown:this.props.timer
        }
    }

    componentDidMount(): void {
         timerID = window.setInterval(()=>{
            const countdown = this.state.countdown-1000;
            this.setState({countdown});
            if(countdown < 1000){
                window.clearInterval(timerID);
                this.props.onFinish();
                document.title = `番茄闹钟`;
            }
        },1000);
    }

    componentWillUnmount(): void {
        window.clearInterval(timerID);
    }

    render() {
        const countdown = this.state.countdown;
        const minutes = Math.floor(countdown/1000/60);
        const seconds = Math.floor(countdown/1000%60);
        const timer = `${minutes}:${seconds>=10?seconds:`0${seconds}`}`;
        const percent:number = (1 - (countdown/this.props.duration))*100;
        document.title = `${timer}-番茄闹钟`;
        return (
            <div className="TomatoCountDown">
                <span className="countdownText">{timer}</span>
                <div className="countdownProgress" style={{width:`${percent}%`}}/>
            </div>
        )
    }
}

export default TomatoCountDown