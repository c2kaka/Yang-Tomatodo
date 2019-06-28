import React from "react";
import {Input, Icon, Button} from "antd";
import axios from "src/config/axios";
import {Link} from "react-router-dom";
import './SignUp.scss'

interface ISignUpState {
    account: string;
    password: string;
    password_confirmation: string;
}

class SignUp extends React.Component <any, ISignUpState> {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            password_confirmation: ''
        };
    }

    onChange = (key:keyof ISignUpState, value:string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    submit = async () => {
        const {account, password, password_confirmation} = this.state;
        try {
            await axios.post('sign_up/user', {
                account,
                password,
                password_confirmation
            });
            this.props.history.push('/');
        } catch (e) {
            throw new Error(e);
        }
    };

    render() {
        const {account, password, password_confirmation} = this.state;
        return (
            <div className="SignUp" id="SignUp">
                <h1>番茄闹钟注册</h1>
                <Input
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    allowClear={true}
                    value={account}
                    onChange={e => this.onChange("account",e.target.value)}
                />
                <Input.Password
                    value={password}
                    placeholder="请输入密码"
                    onChange={e => this.onChange("password",e.target.value)}
                />
                <Input.Password
                    value={password_confirmation}
                    placeholder="请确认密码"
                    onChange={e => this.onChange("password_confirmation",e.target.value)}
                />

                <Button type='primary' className='signUpBtn' onClick={this.submit}>注册</Button>
                <p>已有账号?<Link to='/login'>登录</Link></p>
            </div>
        )
    }
}

export default SignUp