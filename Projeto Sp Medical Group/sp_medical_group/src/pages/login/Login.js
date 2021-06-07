import { Component } from "react";
import ilustration from '../../assets/img/ilustration-login.svg';
import logo from '../../assets/img/logo_spmedgroup.png';
import '../../assets/css/Login.css';


class Login extends Component{
  constructor(props){
      super(props);
      this.state = {

      }
  }


  render(){
    return(
        <body>
          <main className="Login-main">
            <section className="Login-ilustration Flex-center">
              <figure>
                <img src={ilustration} alt="Ilustração de um atendimento médico"/>
              </figure>
            </section>
            <section className="Login-login Flex-evenly-column">
              
              <a href="Home"><img className="Login-logo" src={logo} alt="Logo Sp Medical Group" /></a>  

              <div className="Login-text">
                <h1>Bem-Vindo</h1>
              </div>

              <form type="submit" className="Login-form Flex-evenly-column">
                <input type="email" className="Login-input Login-input-email" placeholder="Digite seu email"/>
                <input type="password" className="Login-input Login-input-senha" placeholder="Digite sua senha"/>
                <button type="button" className="Login-button" >Entrar</button>
              </form>

        


            </section>
          </main>
        </body>
    );
  }
};

export default Login;