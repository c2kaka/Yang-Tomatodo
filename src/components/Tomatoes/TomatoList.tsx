import React from "react";
import {format} from "date-fns";
import "./TomatoList.scss"

interface ITomatoListProps {
    getRecentCompletedTomatoes: ()=> any;
}

const TomatoItem = (props) => {
    return (
        <div className="todoItem">
            <span className="duration">{format(props.started_at,"H:mm")}-{format(props.ended_at,"H:mm")}</span>
            <span className="description">{props.description}</span>
        </div>
    )
};

class TomatoList extends React.Component<ITomatoListProps> {

    constructor(props){
        super(props);
    }

    last3daysCompletedTomatoes= ():string[] => {
        const last3daysCompletedTomatoes = Object.keys(this.props.getRecentCompletedTomatoes());
        return  last3daysCompletedTomatoes.sort(((a, b) => Date.parse(b) - Date.parse(a))).slice(0,3);
    };


    render() {

        const list = this.last3daysCompletedTomatoes().map(d=>{
            const tomato:any[] = this.props.getRecentCompletedTomatoes()[d];

           return (
               <div key={d}>
                  <div className="listTitle">
                      <span className="endDate">{format(d,"M月D日")}</span>
                      <span className="completedAmount">完成了{tomato.length}个番茄</span>
                  </div>
                   {
                        tomato.map(t=>{
                            return <TomatoItem key={t.id} {...t}/>
                        })
                   }
               </div>
           )
        });

        return (
            <div className="TomatoList">
                {list}
            </div>
        )
    }
}

export default TomatoList