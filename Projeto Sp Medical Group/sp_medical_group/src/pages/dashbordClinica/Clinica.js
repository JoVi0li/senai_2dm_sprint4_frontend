import { Component } from "react";
import '../../assets/css/List.css';
import SideBar from "../../components/sideBar/SideBar";
import clinicaIcon from '../../assets/icons/clinica.svg';
import moreIcon from '../../assets/icons/more.svg';

import Modal from '../../components/Modal/Modal';

class Clinica extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaClinicas: [],
            show: false,
            open: false,
            nomeFantasia: '',
            razaoSocial: '',
            cnpj: '',
            endereco: '',
            horarioFuncionamento: '',
            isLoading: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };


    buscarClinicas = () => {
        fetch('http://localhost:5000/api/Clinica')
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch(erro => console.log(erro));
    }

    cadastrarClinicas = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let clinica = {
            NomeFantasia: this.state.nomeFantasia,
            RazaoSocial: this.state.razaoSocial,
            Cnpj: this.state.cnpj,
            Endereco: this.state.endereco,
            HorarioFuncionamento: this.state.horarioFuncionamento
        };

        fetch('http://localhost:5000/api/Clinica', {
            method: 'POST',
            body: JSON.stringify(clinica),
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
                this.buscarClinicas
            )
    }

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
        console.log(campo.target.value)
    };

    componentDidMount() {
        this.buscarClinicas();
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
                                    <img src={clinicaIcon} alt='Icone de pacientes' />
                                </figure>
                                <p>Lista de clínicas</p>
                            </div>
                            <div className='buttonAdd'>
                                <Modal>
                                    <div className='formContent'>
                                        <header>
                                            <h1>Cadastro de clínica</h1>
                                        </header>
                                        <form className='modalForm' onSubmit={this.cadastrarClinicas}>
                                            <input placeholder='Nome Fantasia' type='text' value={this.state.nomeFantasia} name='nomeFantasia' onChange={this.atualizaStateCampo} />
                                            <input placeholder='Razão Social' type='text' value={this.state.RazaoSocial} name='razaoSocial' onChange={this.atualizaStateCampo} />
                                            <input placeholder='CNPJ' type='text' value={this.state.cnpj} name='cnpj' onChange={this.atualizaStateCampo} />
                                            <input placeholder='Endereço' type='text' value={this.state.endereco} name='endereco' onChange={this.atualizaStateCampo} />
                                            <input placeholder='Horário de Funcionamento' type='text' value={this.state.horarioFuncionamento} name='horarioFuncionamento' onChange={this.atualizaStateCampo} />
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
                                <span>{this.state.listaClinicas.length}</span>
                                <p>clínicas</p>
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
                                this.state.listaClinicas.map(clinica => {
                                    return (
                                        <li key={clinica.idClinica}>
                                            <figure>
                                                <img src={clinicaIcon} alt='Icone de usuário' />
                                            </figure>
                                            <div className='nomeEmail'>
                                                <p>{clinica.nomeFantasia !== '' ? clinica.nomeFantasia : '-'}</p>
                                                <p className='subInfo'>{clinica.razaoSocial !== '' ? clinica.razaoSocial : '-'}</p>
                                            </div>
                                            <div>
                                                <p>{clinica.horarioFuncionamento !== '' ? clinica.horarioFuncionamento : '-'}</p>
                                            </div>
                                            <div>
                                                <p>{clinica.endereco !== '' ? clinica.endereco : '-'}</p>
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