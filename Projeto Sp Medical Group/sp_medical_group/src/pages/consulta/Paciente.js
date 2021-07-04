import  React,{ Component } from "react";
import { Link } from 'react-router-dom';
import '../../assets/css/List.css';
import consultaIcon from '../../assets/icons/consulta.svg';
import { parseJwt } from "../../services/Auth";

class ConsultaPaciente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: []
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };


    buscarConsultas = () => {
        fetch('http://localhost:5000/api/Consultum/GetByIdPatient/' + parseJwt().jti, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaConsultas: data }))
            .catch(erro => console.log(erro));
    }


    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log(campo.target.value)
    };

    componentDidMount() {
        this.buscarConsultas();
    }

    render() {
        return (

            <div className='Body'>
                <div className='Content-Consulta'>


                    <header className='Header'>
                        <div className='tituloButton'>
                            <div className='tituloIcon'>
                                <figure>
                                    <Link to='/home'>
                                        <img src={consultaIcon} alt='Icone de pacientes' />
                                    </Link>
                                </figure>
                                <p>Minhas consultas</p>
                            </div>
                        </div>
                        <div className='infos'>
                            <div className='countUsers'>
                                <span>{this.state.listaConsultas.length}</span>
                                <p>consultas</p>
                            </div>
                            <div className='options'>
                                <form >
                                    <label>Listar por: </label>
                                    <select>
                                        <option>Ordem padrão</option>

                                    </select>
                                </form>
                            </div>
                        </div>
                    </header>
                    <main className='list'>
                        <ul>
                            {
                                this.state.listaConsultas.map(consulta => {
                                    return (
                                        <li key={consulta.idConsulta}>
                                            <figure>
                                                <img src={consultaIcon} alt='Icone de consulta' />
                                            </figure>
                                            <div className='nomeEmail'>
                                                <p>{consulta.idProntuarioNavigation.nome !== '' ? consulta.idProntuarioNavigation.nome : '-'}</p>
                                                <p className='subInfo'>Paciente</p>
                                            </div>
                                            <div>
                                                <p>{consulta.idMedicoNavigation.nome !== '' ? consulta.idMedicoNavigation.nome : '-'}</p>
                                                <p className='subInfo'>Médico</p>
                                            </div>
                                            <div>
                                                <p>{consulta.dataConsulta !== '' ? Intl.DateTimeFormat("pt-BR").format(new Date(consulta.dataConsulta)) : '-'}</p>
                                                <p className='subInfo'>Data da consulta</p>

                                            </div>
                                            <div>
                                                <p>{consulta.situacao !== '' ? consulta.situacao : '-'}</p>
                                                <p className='subInfo'>Situação</p>

                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </main>
                </div>
            </div>
        )
    }
}

export default ConsultaPaciente;