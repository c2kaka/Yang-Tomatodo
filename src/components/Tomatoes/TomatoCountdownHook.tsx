import React,{FunctionComponent,useState,useEffect} from "react";

interface ITomatoCountDownHookProps {
    timer: number;
    onFinish: ()=> void;
}

const TomatoCountdownHook:FunctionComponent<ITomatoCountDownHookProps> = (props) => {
    const [countdown,setCountDown] = useState(props.timer);
    const minutes:number = Math.floor(countdown/1000/60);
    const seconds:number = Math.floor(countdown/1000%60);
    const time:string = `${minutes}:${seconds>=10?seconds:`0${seconds}`}`;

    let timerID:number;

    useEffect(() => {
        timerID = window.setInterval(()=>{
            setCountDown(countdown-1000);
            if(countdown < 1000){
                window.clearInterval(timerID);
            }
        },1000);
        document.title = `${time}-番茄闹钟`;

        return function cleanup() {
            window.clearInterval(timerID);
            props.onFinish();
            document.title = `番茄闹钟`;
        };
    });

    return (
        <div className="TomatoCountDown">
            {time}
        </div>
    )
};

export default TomatoCountdownHook