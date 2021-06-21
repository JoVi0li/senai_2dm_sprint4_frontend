import { Component } from "react";
import '../../assets/css/List.css';
import SideBar from "../../components/sideBar/SideBar";
import consultaIcon from '../../assets/icons/consulta.svg';
import moreIcon from '../../assets/icons/more.svg';

import Modal from '../../components/Modal/Modal';

class Clinica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaConsultas: [],
            listaMedicos: [],
            listaProntuarios: [],
            show: false,
            open: false,
            idProntuario: 0,
            idMedico: 0,
            dataConsulta: '',
            situacao: '',
            isLoading: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };


    buscarConsultas = () => {
        fetch('http://localhost:5000/api/Consultum')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaConsultas: data }))
            .catch(erro => console.log(erro));
    }

    buscarMedicos = () => {
        fetch('http://localhost:5000/api/Medico')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedicos: data }))
            .catch(erro => console.log(erro));
    }

    buscarProntuarios = () => {
        fetch('http://localhost:5000/api/Prontuario')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaProntuarios: data }))
            .catch(erro => console.log(erro));
    }


    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let consulta = {
            IdProntuario: this.state.idProntuario,
            IdMedico: this.state.idMedico,
            DataConsulta: this.state.dataConsulta,
            Situacao: this.state.situacao
        };

        fetch('http://localhost:5000/api/Consultum', {
            method: 'POST',
            body: JSON.stringify(consulta),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false });
                }
            })
            .then(
                this.buscarConsultas
            )
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log(campo.target.value)
    };

    componentDidMount() {
        this.buscarConsultas();
        this.buscarMedicos();
        this.buscarProntuarios();
    }

    render() {
        return (

            <div className='Body'>
                <SideBar />
                <div className='Content'>


                    <header className='Header'>
                        <div className='tituloButton'>
                            <div className='tituloIcon'>
                                <figure>
                                    <img src={consultaIcon} alt='Icone de pacientes' />
                                </figure>
                                <p>Lista de consultas</p>
                            </div>
                            <div className='buttonAdd'>
                                <Modal>
                                    <div className='formContent'>
                                        <header>
                                            <h1>Cadastro de consulta</h1>
                                        </header>
                                        <form className='modalForm' onSubmit={this.cadastrarConsulta}>
                                            <select className='listSelect' name='idMedico' type='text' value={this.state.idMedico} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione o médico</option>
                                                {
                                                    this.state.listaMedicos.map(medico => {
                                                        return (
                                                            <option key={medico.idMedico} value={medico.idMedico}>
                                                                {medico.nome}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            <select className='listSelect' name='idProntuario' type='text' value={this.state.idProntuario} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione o prontuário</option>
                                                {
                                                    this.state.listaProntuarios.map(prontuario => {
                                                        return (
                                                            <option key={prontuario.idProntuario} value={prontuario.idProntuario}>
                                                                {prontuario.nome}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <input type='datetime-local' name='dataConsulta' value={this.state.dataConsulta} onChange={this.atualizaStateCampo} />
                                            <input placeholder='Situação' type='text' name='situacao' value={this.state.situacao} onChange={this.atualizaStateCampo} />
                                            <span ></span>

                                            {
                                                this.state.isLoading === true &&
                                                <button type="submit" disabled style={{ backgroundColor: 'rgba(131, 190, 223, 0.5)', cursor: 'wait' }}>
                                                    Cadastrando...
                                                </button>
                                            }
                                            {
                                                this.state.isLoading === false &&
                                                <button type="submit"
                                                    disabled={this.state.nome === '' || this.state.email === '' || this.state.senha === '' ? 'none' : ''}
                                                >
                                                    Cadastrar
                                                </button >
                                            }
                                        </form>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className='infos'>
                            <div className='countUsers'>
                                <span>{this.state.listaConsultas.length}</span>
                                <p>prontuários</p>
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
                                                <p>{consulta.idProntuario !== '' ? consulta.idProntuario : '-'}</p>
                                            </div>
                                            <div>
                                                <p>{consulta.idMedico !== '' ? consulta.idMedico : '-'}</p>
                                            </div>
                                            <div>
                                                <p>{consulta.dataConsulta !== '' ? Intl.DateTimeFormat("pt-BR").format(new Date(consulta.dataConsulta)) : '-'}</p>
                                            </div>
                                            <div>
                                                <p>{consulta.situacao !== '' ? consulta.situacao : '-'}</p>
                                            </div>
                                            <figure>
                                                <img src={moreIcon} alt='Icone de mais opções' />
                                            </figure>
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

export default Clinica;