import React from "react";
import "./Tomatoes.scss"
import TomatoAction from "./TomatoAction"
import axios from "src/config/axios";
import {connect} from "react-redux";
import {addTomato,initTomatoes,postTomato} from "../../redux/actions/tomatoes";

interface ITomatoesProps {
    tomatoes: any[];
    addTomato: (payload:any) => any;
    initTomatoes: (payload: any[]) => any;
    postTomato: (payload: any) => any;
}

class Tomatoes extends React.Component<ITomatoesProps> {

    componentDidMount(): any {
        this.initTomatoes();
    }

    startTomato = async ()=>{
      const params = {duration: 1500000};
      const response = await axios.post("tomatoes",params);
      this.props.addTomato(response.data.resource);
    };

    getUnCompletedTomato = () => {
        return this.props.tomatoes.filter(t=> !t.description && !t.ended_at)[0];
    };

    initTomatoes = async ()=>{
        const response = await axios.get("tomatoes");
        this.props.initTomatoes(response.data.resources);
    };

    postTomato = async (id:number,params:any)=>{
        const response = await axios.put(`tomatoes/${id}`,params);
        this.props.postTomato(response.data.resource);
    };

    render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction
                    startTomato={this.startTomato}
                    getUnCompletedTomato={this.getUnCompletedTomato}
                    postTomato={this.postTomato}
                />
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
    addTomato,
    initTomatoes,
    postTomato
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)