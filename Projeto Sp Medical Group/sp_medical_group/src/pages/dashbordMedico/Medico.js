import { Component } from "react";
import '../../assets/css/List.css';
import SideBar from "../../components/sideBar/SideBar";
import medicoIcon from '../../assets/icons/medico.svg'
import userIcon from '../../assets/icons/user.svg';
import moreIcon from '../../assets/icons/more.svg';

import Modal from '../../components/Modal/Modal';

class Medico extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaMedicos: [],
            listaUsuarios: [],
            listaClinicas: [],
            listaEspecialidades: [],
            show: false,
            open: false,
            nome: '',
            crm: '',
            idUsuario: 0,
            idEspecialidade: 0,
            idClinica: 0,
            isLoading: false,
            mensagem: ''
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };


    buscarMedicos = () => {
        fetch('http://localhost:5000/api/Medico')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedicos: data }))
            .catch(erro => console.log(erro));
    }

    buscarUsuarios = () => {
        fetch('http://localhost:5000/api/Usuario')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    buscarClinicas = () => {
        fetch('http://localhost:5000/api/Clinica')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch(erro => console.log(erro));
    }

    buscarEspecialidade = () => {
        fetch('http://localhost:5000/api/Especialidade')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro));
    }

    cadastrarMedico = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let paciente = {
            Nome: this.state.nome,
            Crm: this.state.crm,
            IdUsuario: this.state.idUsuario,
            IdEspecialidade: this.state.idEspecialidade,
            IdClinica: this.state.idClinica
        };

        fetch('http://localhost:5000/api/Medico', {
            method: 'POST',
            body: JSON.stringify(paciente),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false })
                    this.setState({ mensagem: 'Médico cadastrado!' })
                }
            })

            .catch(() => {
                this.setState({ isLoading: false });
            })
            .then(
                this.buscarMedicos,
            );
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log(campo.target.value)
    };

    componentDidMount() {
        this.buscarMedicos();
        this.buscarUsuarios();
        this.buscarClinicas();
        this.buscarEspecialidade();
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
                                    <img src={medicoIcon} alt='Icone de pacientes' />
                                </figure>
                                <p>Lista de médicos</p>
                            </div>
                            <div className='buttonAdd'>
                                <Modal>
                                    <div className='formContent'>
                                        <header>
                                            <h1>Cadastro de médicos</h1>
                                        </header>
                                        <form className='modalForm' onSubmit={this.cadastrarMedico}>
                                            <select className='listSelect' name='idUsuario' type='text' value={this.state.idUsuario} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione o usuário</option>
                                                {
                                                    this.state.listaUsuarios.map(usuario => {
                                                        return (
                                                            <option key={usuario.idUsuario} value={usuario.idUsuario}>
                                                                {usuario.nome}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <select className='listSelect' name='idClinica' type='text' value={this.state.idClinica} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione a clínica</option>
                                                {
                                                    this.state.listaClinicas.map(clinica => {
                                                        return (
                                                            <option key={clinica.idClinica} value={clinica.idClinica}>
                                                                {clinica.razaoSocial}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <select className='listSelect' name='idEspecialidade' type='text' value={this.state.idEspecialidade} onChange={this.atualizaStateCampo}>
                                                <option value='0'>Selecione a especialidade</option>
                                                {
                                                    this.state.listaEspecialidades.map(especialidade => {
                                                        return (
                                                            <option key={especialidade.idEspecialidade} value={especialidade.idEspecialidade}>
                                                                {especialidade.nomeEspecialidade}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <input placeholder='Nome' type='text' value={this.state.nome} name='nome' onChange={this.atualizaStateCampo} />
                                            <input placeholder='CRM' type='text' value={this.state.crm} name='crm' onChange={this.atualizaStateCampo} />
                                            <p className='mensagem'>{this.state.mensagem}</p>
                                            {
                                                this.state.isLoading === true &&
                                                <button type="submit" disabled style={{ backgroundColor: 'rgba(131, 190, 223, 0.5)', cursor: 'wait' }}>
                                                    Cadastrando...
                                                </button>
                                            }
                                            {
                                                this.state.isLoading === false &&
                                                <button type="submit"
                                                    disabled={this.state.nome === '' || this.state.crm === '' || this.state.idEspecialidade === '' || this.state.idUsuario === '' || this.state.idClinica === ''
                                                        ? 'none' : ''
                                                    }
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
                                <span>{this.state.listaMedicos.length}</span>
                                <p>médicos</p>
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
                                this.state.listaMedicos.map(medico => {
                                    return (
                                        <li key={medico.idMedico}>
                                            <figure>
                                                <img src={userIcon} alt='Icone de usuário' />
                                            </figure>
                                            <div className='nomeEmail'>
                                                <p>{medico.nome !== '' ? medico.nome : '-'}</p>
                                            </div>
                                            <div>
                                                <p >{medico.crm !== '' ? medico.crm : '-'}</p>
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

export default Medico;