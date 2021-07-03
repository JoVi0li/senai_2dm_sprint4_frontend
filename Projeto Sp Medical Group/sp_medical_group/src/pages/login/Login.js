import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { parseJwt, userAutenticado } from "../../services/Auth";

import '../../assets/css/Login.css'
import ilustration from '../../assets/images/ilustration-login.svg'
import logo from '../../assets/images/logo_spmedgroupBig.svg'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senha: '',
            email: '',
            erroMensagem: '',
            isLoading: false
        }
    }

    efetuarLogin = (event) => {
        event.preventDefault();
        this.setState({erroMensagem: '', isLoading: true})
        axios.post('http://localhost:5000/api/Login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('userToken', resposta.data.token);
                    this.setState({isLoading: false})

                    if (parseJwt().Role === '1') {
                        this.props.history.push('/dashbord')
                    }

                    if (parseJwt().Role === '2') {
                        this.props.history.push('/consultas/Medico')
                    }

                    if (parseJwt().Role === '3') {
                        this.props.history.push('/dashbord/Paciente')
                    }
                }
            })
            .catch(() => {
                this.setState({erroMensagem : "E-mail ou senha inválidos", isLoading: false})
            })
    }

    attState = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    }


    render() {
        return (
            <div className='loginBody'>
                <section className='loginIlustration'>
                    <figure>
                        <img src={ilustration} alt='Ilustração de um atendimento médico' />
                    </figure>
                </section>

                <section className='loginLogin'>
                    <div className='loginContent'>
                        <figure className='loginImg'>
                            <Link to='/'><img src={logo} alt='Logo do Sp Medical Group' /></Link>
                        </figure>
                        <form onSubmit={this.efetuarLogin}>
                            <p className='msgErro'>{this.state.erroMensagem}</p>
                            <input className='email' placeholder='Digite seu e-mail' type='text' name='email' onChange={this.attState} value={this.state.email} />
                            <input className='senha' placeholder='Digite sua senha' type='password' name='senha' onChange={this.attState} value={this.state.senha} />
                            {
                                this.state.isLoading === true &&
                                <button type='submit'>Carregando...</button>
                                    
                            }
                            {
                                this.state.isLoading === false &&
                                <button
                                    type='submit'
                                    disabled={this.state.email === '' || this.state.senha === '' ? 'none': ''}
                                >
                                    Entrar
                                </button>

                            }
                        </form>
                    </div>
                </section>

            </div>
        )
    }
}
export default Login;