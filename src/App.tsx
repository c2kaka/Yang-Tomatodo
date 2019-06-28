import React from "react";
import {  Router, Route } from "react-router-dom";
import history from "src/config/history";
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

class App extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Route exact={true} path="/" component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/signUp" component={SignUp}/>
            </Router>
        )
    }
}
export default App