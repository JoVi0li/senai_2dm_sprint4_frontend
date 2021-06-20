import { Component } from "react";
import { Link } from 'react-router-dom';

import '../../assets/css/Login.css'
import ilustration from '../../assets/images/ilustration-login.svg'
import logo from '../../assets/images/logo_spmedgroupBig.svg'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            senha : '',
            email : ''
        }
    }


    render(){
        return(
            <div className='loginBody'>
                <section className='loginIlustration'>
                    <figure>
                        <img src={ilustration} alt='Ilustração de um atendimento médico'/>
                    </figure>
                </section>

                <section className='loginLogin'>
                    <div className='loginContent'>
                        <figure>
                            <Link to='/'><img src={logo} alt='Logo do Sp Medical Group'/></Link>
                        </figure>
                        <form onSubmit=''>
                            <input placeholder='Digite seu e-mail' type='text' name='email' value={this.state.email}/>
                            <input placeholder='Digite sua senha' type='password' name='senha' value={this.state.senha}/>
                            <button type='submit' >Entrar</button>

                        </form>
                    </div>
                </section>

            </div>
        )
    }
}
export default Login;