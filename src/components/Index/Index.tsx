import React from "react";
import {Button} from "antd";

class Index extends React.Component<any> {
    constructor(props:any){
        super(props);
    }

    login = ()=>{
        this.props.history.push("/login")
    };

    render() {
        return(
            <div>
                <Button onClick={this.login}>Login</Button>
            </div>
        )
    }
}

export default Index