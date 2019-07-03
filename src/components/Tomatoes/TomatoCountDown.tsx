import React from "react";

interface ITomatoCountDownProps {
    timer: number;
}

interface ITomatoCountDownState {
    countdown: number;
}

class TomatoCountDown extends React.Component<ITomatoCountDownProps,ITomatoCountDownState> {
    constructor(props) {
        super(props);
        this.state={
            countdown:this.props.timer
        }
    }

    componentDidMount(): void {
        const timerID:number = window.setInterval(()=>{
            const countdown = this.state.countdown-1000;
            this.setState({countdown});
            if(countdown<=0){
                window.clearInterval(timerID);
            }
        },1000);
    }


    render() {
        const countdown = this.state.countdown;
        const minutes = Math.floor(countdown/1000/60);
        const seconds = Math.floor(countdown/1000%60);
        const timer = `${minutes}:${seconds>=10?seconds:`0${seconds}`}`;
        return (
            <div className="TomatoCountDown">
                {timer}
            </div>
        )
    }
}

export default TomatoCountDown