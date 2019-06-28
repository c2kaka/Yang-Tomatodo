import React from "react";
import {Button} from "antd";
import axios from "src/config/axios";

interface IRouter {
    history: any;
}

interface  IIndexState {
    user: any;
}

class Index extends React.Component<IRouter,IIndexState> {
    constructor(props:any){
        super(props);
        this.state={
            user:{}
        }
    }

    async componentWillMount(){
        await this.getMe();
    }

    getMe = async () => {
        try{
            const response = await axios.get("/me");
            this.setState({user:response.data});
        }
        catch (e) {
            console.error("getting user information failed!")
        }
    };

    logout = ()=>{
        localStorage.setItem("x-token","");
        this.props.history.push("/login")
    };

    render() {
        return(
            <div>
                <p>欢迎,{this.state.user && this.state.user.account}</p>
                <Button onClick={this.logout}>登出</Button>
            </div>
        )
    }
}

export default Index