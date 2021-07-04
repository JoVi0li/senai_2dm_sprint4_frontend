import { Component } from "react";
import '../../assets/css/Home.css'
import '../../assets/css/List.css'
import SideBar from "../../components/sideBar/SideBar";
import Modal from "../../components/Modal/Modal";
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/trash_full.svg'


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
            nomeEspecialidadeCad: '',
            idUsuarioAlterado: 0,
            idTipoUsuarioAlterado: 0,
            idEspecialidadeAlterado: 0,
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    buscarEspecialidades = () => {
        fetch('http://localhost:5000/api/Especialidade', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro));
    }

    BuscarEspecialidadePorId = (esp) => {
        this.setState({
            idEspecialidadeAlterado: esp.idEspecialidade,
            nomeEspecialidade: esp.nomeEspecialidade
        })
    }

    buscarTiposUsuarios = () => {
        fetch('http://localhost:5000/api/TipoUsuario', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaTiposUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    BuscarTiposUsuariosPorId = (tip) => {
        this.setState({
            idTipoUsuarioAlterado: tip.idTipoUsuario,
            nomeTipoUsuario: tip.nomeTipoUsuario
        })
    }

    buscarUsuarios = () => {
        fetch('http://localhost:5000/api/Usuario', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(erro => console.log(erro));
    }

    BuscarUsuarioPorId = (user) => {
        this.setState({
            idUsuarioAlterado: user.idUsuario,
            nome: user.Nome,
            email: user.email,
            senha: user.senha
        })
    }

    cadastrarUsuario = (event) => {
        event.preventDefault();

        if (this.state.idUsuarioAlterado !== 0) {
            this.setState({ isLoading: true, mensagem: '' });

            let usuario = {
                Nome: this.state.nome,
                Email: this.state.email,
                Senha: this.state.senha,
                IdTipoUsuario: this.state.tipoUsuario,
            };

            fetch('http://localhost:5000/api/Usuario/' + this.state.idUsuarioAlterado, {
                method: 'PUT',
                body: JSON.stringify(usuario),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        this.setState({ isLoading: false })
                        this.setState({ mensagem: 'Usuário atualizado!' })
                    }
                })
                .then(
                    this.buscarUsuarios
                );

        } else {
            this.setState({ isLoading: true, mensagem: '' });

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
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
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
    }

    cadastrarTiposUsuarios = (event) => {
        event.preventDefault();

        if (this.state.idTipoUsuarioAlterado !== 0) {
            this.setState({ isLoading: true, mensagem: '' });

            let tipoUsuario = {
                nomeTipoUsuario: this.state.nomeTipoUsuario
            };

            fetch('http://localhost:5000/api/TipoUsuario/' + this.state.idTipoUsuarioAlterado, {
                method: 'PUT',
                body: JSON.stringify(tipoUsuario),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        this.setState({ isLoading: false })
                        this.setState({ mensagem: 'Tipo de Usuário atualizado!' })
                    }
                })
                .then(
                    this.buscarTiposUsuarios
                );

        } else {
            this.setState({ isLoading: true, mensagem: '' });

            let tipoUsuario = {
                nomeTipoUsuario: this.state.nomeTipoUsuario
            };

            fetch('http://localhost:5000/api/TipoUsuario', {
                method: 'POST',
                body: JSON.stringify(tipoUsuario),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
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
    }

    cadastrarEspecialidades = (event) => {
        event.preventDefault();

        if (this.state.idEspecialidadeAlterado !== 0) {
            this.setState({ isLoading: true, mensagem: '' });

            let especialidade = {
                NomeEspecialidade: this.state.nomeEspecialidadeCad
            };

            fetch('http://localhost:5000/api/Especialidade/' + this.state.idEspecialidadeAlterado, {
                method: 'PUT',
                body: JSON.stringify(especialidade),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                        this.setState({ isLoading: false })
                        this.setState({ mensagem: 'Especialidade atualizada!' })
                    }
                })
                .then(
                    this.buscarEspecialidades
                );

        } else {
            this.setState({ isLoading: true, mensagem: '' });

            let especialidade = {
                NomeEspecialidade: this.state.nomeEspecialidadeCad
            };

            fetch('http://localhost:5000/api/Especialidade/', {
                method: 'POST',
                body: JSON.stringify(especialidade),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('userToken')
                }
            })
                .then(resposta => {
                    if (resposta.status === 201) {
                        this.setState({ isLoading: false })
                        this.setState({ mensagem: 'Especialidade cadastrada!' })
                    }
                })
                .then(
                    this.buscarEspecialidades
                );

        }
    }


    ExcluirUsuario = (user) => {
        fetch('http://localhost:5000/api/Usuario/' + user.idUsuario, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    this.buscarUsuarios();
                    console.log("Deu certo!!! Excluiu")
                }
            })
    }

    ExcluirTipoUsuario = (tip) => {
        fetch('http://localhost:5000/api/TipoUsuario/' + tip.idTipoUsuario, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    this.buscarTiposUsuarios();
                    console.log("Deu certo!!! Excluiu")
                }
            })
    }

    ExcluirEspecialidade = (esp) => {
        fetch('http://localhost:5000/api/Especialidade/' + esp.idEspecialidade, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('userToken')
            }
        })
            .then(resposta => {
                if (resposta.status === 204) {
                    this.buscarEspecialidades();
                    console.log("Deu certo!!! Excluiu")
                }
            })
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
                                        {
                                            this.state.idUsuarioAlterado !== 0 ?
                                                <h1>Atualização de usuário</h1>
                                                : <h1>Cadastro de usuário</h1>

                                        }
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
                                            this.state.isLoading === false && this.state.idUsuarioAlterado !== 0 ?
                                                <button type="submit" disabled={this.state.nome === '' ? 'none' : '' || this.state.senha === '' ? 'none' : '' || this.state.email === '' ? 'none' : '' || this.state.idTipoUsuario === '' ? 'none' : ''}>
                                                    Atualizar
                                                </button >
                                                :
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
                                                <figure>
                                                    <button className='button-home' onClick={() => this.BuscarUsuarioPorId(usuario)}>
                                                        <img src={editIcon} alt='Icone de edição' />
                                                    </button>
                                                    <button className='button-home' onClick={() => this.ExcluirUsuario(usuario)}>
                                                        <img src={deleteIcon} alt='Icone de exclusão' />
                                                    </button>
                                                </figure>

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
                                        {
                                            this.state.idTipoUsuarioAlterado !== 0 ?
                                                <h1>Atualização de tipo de usuário</h1>
                                                : <h1>Cadastro de tipo de usuário</h1>

                                        }
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
                                            this.state.isLoading === false && this.state.idTipoUsuarioAlterado !== 0 ?
                                                <button type="submit" disabled={this.state.nomeTipoUsuario === '' ? 'none' : ''}>
                                                    Atualizar
                                                </button >
                                                :
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
                                                <figure>
                                                    <button className='button-home' onClick={() => this.BuscarTiposUsuariosPorId(tipoUsuario)}>
                                                        <img src={editIcon} alt='Icone de edição' />
                                                    </button>
                                                    <button className='button-home' onClick={() => this.ExcluirTipoUsuario(tipoUsuario)}>
                                                        <img src={deleteIcon} alt='Icone de exclusão' />
                                                    </button>
                                                </figure>

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
                                        {
                                            this.state.idEspecialidadeAlterado !== 0 ?
                                                <h1>Atualização de especialidade</h1>
                                                : <h1>Cadastro de especialidade</h1>

                                        }
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
                                            this.state.isLoading === false && this.state.idEspecialidadeAlterado !== 0 ?
                                                <button type="submit" disabled={this.state.nomeEspecialidadeCad === '' ? 'none' : ''}>
                                                    Atualizar
                                                </button >
                                                :
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
                                                <figure>
                                                    <button className='button-home' onClick={() => this.BuscarEspecialidadePorId(especialidade)}>
                                                        <img src={editIcon} alt='Icone de edição' />
                                                    </button>
                                                    <button className='button-home' onClick={() => this.ExcluirEspecialidade(especialidade)}>
                                                        <img src={deleteIcon} alt='Icone de exclusão' />
                                                    </button>
                                                </figure>


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