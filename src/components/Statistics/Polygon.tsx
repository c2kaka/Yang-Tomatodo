import React from "react";
import _ from "lodash";

interface IPolygonProps {
    compltedTodos: any[];
    dailyTodos: any[];
}

class Polygon extends React.Component<IPolygonProps> {
    constructor(props){
        super(props);
    }

    getData = ():string => {
        const groupData = this.props.dailyTodos;
        const sortedData = Object.keys(groupData).sort((a,b) => {
            return Date.parse(a) - Date.parse(b);
        });
        if(sortedData.length>0){
            const firstDay:number = Date.parse(sortedData[0]);
            const lastDay:number = Date.parse(sortedData[sortedData.length-1]);
            const range:number = lastDay - firstDay;
            let completedCount:number = 0;
            let lastY;
            const points :string[] = sortedData.map(date => {
                const x:number = (Date.parse(date) - firstDay)/range*240;
                completedCount += groupData[date].length;
                const y:number = (1-completedCount/this.props.compltedTodos.length)*60;
                lastY = y;
                return `${x},${y}`;
            });
            return ["0,60",...points,`240,${lastY}`,"240,60"].join(" ");

        }else{
            return "0,60 240,60"
        }
    };

    render() {
        return (
            <div className="Polygon">
                <svg>
                    <polygon fill="rgba(24,144,255,0.1)" stroke="rgba(24,144,255,0.5)" strokeWidth="1" points={this.getData()}/>
                </svg>
            </div>
        )
    }
}

export default Polygon