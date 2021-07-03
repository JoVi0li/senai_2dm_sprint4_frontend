import { Component } from "react";
import '../../assets/css/List.css';
import '../../assets/css/ModalChoice.css';
import SideBar from "../../components/sideBar/SideBar";
import medicoIcon from '../../assets/icons/medico.svg'
import userIcon from '../../assets/icons/user.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash_full.svg'

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
            idMedico: 0,
            idEspecialidade: 0,
            idClinica: 0,
            isLoading: false,
            mensagem: '',
            idMedicoAlterado: 0,
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };


    buscarMedicos = () => {
        fetch('http://localhost:5000/api/Medico', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedicos: data }))
            .catch(erro => console.log(erro));
    }

    BuscarMedicoPorId = (medico) => {
        this.setState({
            idUsuario: medico.idUsuario,
            idMedicoAlterado: medico.idMedico,
            nome: medico.nome,
            crm: medico.crm,
            idClinica: medico.idClinica,
            idEspecialidade: medico.idEspecialidade
        })
    }

    buscarUsuarios = () => {
        fetch('http://localhost:5000/api/Usuario', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    buscarClinicas = () => {
        fetch('http://localhost:5000/api/Clinica', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch(erro => console.log(erro));
    }

    buscarEspecialidade = () => {
        fetch('http://localhost:5000/api/Especialidade', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro));
    }

    cadastrarMedico = (event) => {
        event.preventDefault();
        if (this.state.idMedicoAlterado !== 0) {

            this.setState({ isLoading: true });

            let medico = {
                Nome: this.state.nome,
                Crm: this.state.crm,
                IdUsuario: this.state.idUsuario,
                IdEspecialidade: this.state.idEspecialidade,
                IdClinica: this.state.idClinica
            };
    
            fetch('http://localhost:5000/api/Medico/' + this.state.idMedicoAlterado, {
                method: 'PUT',
                body: JSON.stringify(medico),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        this.setState({ isLoading: false })
                        this.setState({ mensagem: 'Médico Atualizado' })
                    }
                })
    
                .catch(() => {
                    this.setState({ isLoading: false });
                })
                .then(
                    this.buscarMedicos
                );
            
        } else {

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
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
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
    }

    ExcluirMedico = (medico) => {
        fetch('http://localhost:5000/api/Medico/' + medico.idMedico, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
        .then(resposta => {
            if (resposta.status === 204) {
                this.buscarMedicos();
                console.log("Deu certo!!! Excluiu")
            }
        })
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
                                        {
                                                this.state.idMedicoAlterado !== 0 ?
                                                    <h1>Atualização de médico</h1>
                                                    : <h1>Cadastro de médico</h1>

                                            }

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
                                                this.state.isLoading === false && this.state.idMedicoAlterado !== 0?
                                                <button type="submit"
                                                    disabled={this.state.nome === '' || this.state.crm === '' || this.state.idEspecialidade === '' || this.state.idUsuario === '' || this.state.idClinica === ''
                                                        ? 'none' : ''
                                                    }
                                                >
                                                    Atualizar
                                                </button >
                                                :                                                 <button type="submit"
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
                                                <button onClick={() => {this.BuscarMedicoPorId(medico)}}>
                                                    <img src={editIcon} alt='Icone de edição' />
                                                </button>
                                                <button onClick={() => this.ExcluirMedico(medico)}>
                                                    <img src={deleteIcon} alt='Icone de exclusão' />
                                                </button>
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