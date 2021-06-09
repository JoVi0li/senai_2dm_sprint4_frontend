import logo from '../assets/icon/logo.svg'
import React, { Component } from "react";

 class Header extends Component{
    render(){
        return(
            <header className="App-header">
                <nav className="App-nav Flex-center-bt">
                <div>
                    <a href="Home"><img src={logo} alt="Logo Sp Medical Group"/></a>
                </div>
                <ul className="App-ul Flex-center-bt">
                    <li><a className="App-a" href="Home">Home</a></li>
                    <li><a className="App-a" href="dashbord">Dashbord</a></li>
                    <li><a className="App-a" href="Clinicas">Clínicas</a></li>
                    <li><a className="App-a-login" href="Login">Login</a></li>
                </ul>
                </nav>
            </header>
        )
    }
}

export default Header;
