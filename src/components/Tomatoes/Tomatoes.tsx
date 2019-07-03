import React from "react";
import "./Tomatoes.scss"
import {Button} from "antd";
import axios from "src/config/axios";
import {connect} from "react-redux";
import {addTomato} from "../../redux/actions";

class Tomatoes extends React.Component {

    startTomato = async ()=>{
      const params = {duration: 1500000};
      const response = await axios.post("tomatoes",params);
      console.log(response.data);
    };

    render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <Button className="startTomatoBtn" onClick={this.startTomato}>开始番茄</Button>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => ({
  tomatoes: state.tomatoes,
  ...ownProps
});

const mapDispatchToProps = {
    addTomato
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes)