import './login.css';
import '../home/App.css';
import { Component } from 'react';



class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : ''
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <body>
                    <header className="header flex-center">
                    <h1 className="title">WishList</h1>
                    </header>
                <div className="body-login">

                    <main className="flex-center main-content">
                        <div className="card-login flex-center-around">
                            <h1 className="title-login">Login</h1>
                            <div className="inputs-login">
                                <form className="form-login flex-center-bt">
                                    <input className="input-login input-button-style" type="text" placeholder="Email"/>
                                    <input className="input-login input-button-style" type="text" placeholder="Senha"/>
                                    <button className="button-login input-button-style" type="submit">Entrar</button>
                                </form>
                            </div>
                            <a className="sem-logar" href="App">Entrar sem logar</a>

                        </div>
                    </main>
                </div>
            </body>

      
        );
    }

}


export default Login;