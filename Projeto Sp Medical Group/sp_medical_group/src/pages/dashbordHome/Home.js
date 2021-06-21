import { Component } from "react";
import '../../assets/css/Home.css'
import '../../assets/css/List.css'
import SideBar from "../../components/sideBar/SideBar";
import Modal from "../../components/Modal/Modal";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeEspecialidade: '',
            listaEspecialidades: [],
            listaTiposUsuarios: [],
            listaUsuarios: [],
            nome: '',
            email: '',
            senha: '',
            isLoading: false,
            idTipoUsuario: 0,
            nomeTipoUsuario: '',
            nomeEspecialidadeCad: ''
        }
    }



    buscarEspecialidades = () => {
        fetch('http://localhost:5000/api/Especialidade')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro));
    }

    buscarTiposUsuarios = () => {
        fetch('http://localhost:5000/api/TipoUsuario')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaTiposUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    buscarUsuarios = () => {
        fetch('http://localhost:5000/api/Usuario')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    cadastrarUsuario = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let usuario = {
            Nome: this.state.nome,
            Email: this.state.email,
            Senha: this.state.senha,
            IdTipoUsuario: this.state.tipoUsuario,
        };

        fetch('http://localhost:5000/api/Usuario', {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false })
                    this.setState({ mensagem: 'Usuário cadastrado!' })
                }
            })
            .then(
                this.buscarUsuarios,
            );
    }

    cadastrarTiposUsuarios = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let tipoUsuario = {
            nomeTipoUsuario: this.state.nomeTipoUsuario
        };

        fetch('http://localhost:5000/api/TipoUsuario', {
            method: 'POST',
            body: JSON.stringify(tipoUsuario),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false })
                    this.setState({ mensagem: 'Tipo de Usuário cadastrado!' })
                }
            })
            .then(
                this.buscarTiposUsuarios
            );
    }

    cadastrarEspecialidades = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let especialidade = {
            NomeEspecialidade: this.state.nomeEspecialidadeCad
        };

        fetch('http://localhost:5000/api/Especialidade', {
            method: 'POST',
            body: JSON.stringify(especialidade),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    this.setState({ isLoading: false })
                    this.setState({ mensagem: 'Especialidade cadastrado!' })
                }
            })
            .then(
                this.buscarEspecialidades
            );
    }


    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log(campo.target.value)
    };



    componentDidMount() {
        this.buscarEspecialidades();
        this.buscarTiposUsuarios();
        this.buscarUsuarios();
    }

    render() {
        return (
            <div className='homeBody'>
                <SideBar />
                <main className='homeMain'>
                    <div className='homeCard'>
                        <div className='homeCardHeader'>
                            <h2>Usuários</h2>
                            <Modal>
                                <div className='formContent'>
                                    <header>
                                        <h1>Cadastro de usuários</h1>
                                    </header>
                                    <form className='modalForm' onSubmit={this.cadastrarUsuario}>
                                        <input placeholder='Nome' type='text' value={this.state.nome} name='nome' onChange={this.atualizaStateCampo} />
                                        <input placeholder='E-mail' type='email' value={this.state.email} name='email' onChange={this.atualizaStateCampo} />
                                        <input placeholder='Senha' type='password' value={this.state.senha} name='senha' onChange={this.atualizaStateCampo} />
                                        <select className='listSelect' name='idTipoUsuario' type='text' value={this.state.idTipoUsuario} onChange={this.atualizaStateCampo}>
                                            <option value='0'>Selecione o tipo de usuário</option>
                                            {
                                                this.state.listaTiposUsuarios.map(tipoUsuario => {
                                                    return (
                                                        <option key={tipoUsuario.idTipoUsuario} value={tipoUsuario.idTipoUsuario}>
                                                            {tipoUsuario.nomeTipoUsuario}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <span style={{ width: '100%' }}></span>
                                        <p className='mensagem'>{this.state.mensagem}</p>
                                        {
                                            this.state.isLoading === true &&
                                            <button type="submit" disabled style={{ backgroundColor: 'rgba(131, 190, 223, 0.5)', cursor: 'wait' }}>
                                                Cadastrando...
                                            </button>
                                        }
                                        {
                                            this.state.isLoading === false &&
                                            <button type="submit" disabled={this.state.nome === '' ? 'none' : '' || this.state.senha === '' ? 'none' : '' || this.state.email === '' ? 'none' : '' || this.state.idTipoUsuario === '' ? 'none' : ''}>
                                                Cadastrar
                                            </button >
                                        }
                                    </form>
                                </div>
                            </Modal>
                        </div>

                        <div className='homeCardInfos'>
                            <ul className='homeCardList'>
                                {
                                    this.state.listaUsuarios.map(usuario => {
                                        return (
                                            <li key={usuario.idUsuario}>
                                                <div className='idEspecialidade'>
                                                    <p>{usuario.idUsuario !== '' ? usuario.idUsuario : '-'}</p>
                                                </div>
                                                <div>
                                                    <p >{usuario.nome !== '' ? usuario.nome : '-'}</p>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>

                        </div>
                    </div>
                    <div className='homeCard'>
                        <div className='homeCardHeader'>
                            <h2>Tipos de Usuários</h2>
                            <Modal>
                                <div className='formContent'>
                                    <header>
                                        <h1>Cadastro de tipos de usuários</h1>
                                    </header>
                                    <form className='modalForm' onSubmit={this.cadastrarTiposUsuarios}>
                                        <input className='homeInput' placeholder='Nome do tipo de usuário' type='text' value={this.state.nomeTipoUsuario} name='nomeTipoUsuario' onChange={this.atualizaStateCampo} />
                                        <span style={{ width: '100%' }}></span>
                                        <p className='mensagem'>{this.state.mensagem}</p>
                                        {
                                            this.state.isLoading === true &&
                                            <button type="submit" disabled style={{ backgroundColor: 'rgba(131, 190, 223, 0.5)', cursor: 'wait' }}>
                                                Cadastrando...
                                            </button>
                                        }
                                        {
                                            this.state.isLoading === false &&
                                            <button type="submit" disabled={this.state.nomeTipoUsuario === '' ? 'none' : ''}>
                                                Cadastrar
                                            </button >
                                        }
                                    </form>
                                </div>
                            </Modal>
                        </div>

                        <div className='homeCardInfos'>
                            <ul className='homeCardList'>
                                {
                                    this.state.listaTiposUsuarios.map(tipoUsuario => {
                                        return (
                                            <li key={tipoUsuario.idTipoUsuario}>
                                                <div className='idEspecialidade'>
                                                    <p>{tipoUsuario.idTipoUsuario !== '' ? tipoUsuario.idTipoUsuario : '-'}</p>
                                                </div>
                                                <div>
                                                    <p >{tipoUsuario.nomeTipoUsuario !== '' ? tipoUsuario.nomeTipoUsuario : '-'}</p>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='homeCard'>
                        <div className='homeCardHeader'>
                            <h2>Especialidades</h2>
                            <Modal>
                                <div className='formContent'>
                                    <header>
                                        <h1>Cadastro de especialidades</h1>
                                    </header>
                                    <form className='modalForm' onSubmit={this.cadastrarEspecialidades}>
                                        <input className='homeInput' placeholder='Nome da especialidade' type='text' value={this.state.nomeEspecialidadeCad} name='nomeEspecialidadeCad' onChange={this.atualizaStateCampo} />
                                        <span style={{ width: '100%' }}></span>
                                        <p className='mensagem'>{this.state.mensagem}</p>
                                        {
                                            this.state.isLoading === true &&
                                            <button type="submit" disabled style={{ backgroundColor: 'rgba(131, 190, 223, 0.5)', cursor: 'wait' }}>
                                                Cadastrando...
                                            </button>
                                        }
                                        {
                                            this.state.isLoading === false &&
                                            <button type="submit" disabled={this.state.nomeEspecialidadeCad === '' ? 'none' : ''}>
                                                Cadastrar
                                            </button >
                                        }
                                    </form>
                                </div>

                            </Modal>
                        </div>
                        <div className='homeCardInfos'>
                            <ul className='homeCardList'>
                                {
                                    this.state.listaEspecialidades.map(especialidade => {
                                        return (
                                            <li key={especialidade.nomeEspecialidade}>
                                                <div className='idEspecialidade'>
                                                    <p>{especialidade.idEspecialidade !== '' ? especialidade.idEspecialidade : '-'}</p>
                                                </div>
                                                <div>
                                                    <p >{especialidade.nomeEspecialidade !== '' ? especialidade.nomeEspecialidade : '-'}</p>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>

                        </div>
                    </div>
                </main>
            </div>
        )
    }


}

export default Home;