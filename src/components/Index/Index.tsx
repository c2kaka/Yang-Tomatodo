import React from "react";
import { Menu, Dropdown, Icon } from 'antd';
import axios from "src/config/axios";
import history from "src/config/history"
import "./Index.scss";
import Todos from "../Todos/Todos";

interface IRouter {
    history: any;
}

interface  IIndexState {
    user: any;
}

const logout = ()=>{
    localStorage.setItem("x-token","");
    history.push("/login")
};

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Icon type="user" />
            个人设置
        </Menu.Item>
        <Menu.Item key="1" onClick={logout}>
            <Icon type="logout"/>
            注销
        </Menu.Item>
    </Menu>
);

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
            const response = await axios.get("/me");
            this.setState({user:response.data});
    };


    render() {
        return(
            <div className="Index" id="Index">
                <header>
                    <span className="logo" id='logo'>番茄闹钟</span>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <span>
                            {this.state.user && this.state.user.account}
                            <Icon type="down" style={{marginLeft: 8}}/>
                        </span>
                    </Dropdown>
                </header>
                <Todos />
            </div>
        )
    }
}

export default Index