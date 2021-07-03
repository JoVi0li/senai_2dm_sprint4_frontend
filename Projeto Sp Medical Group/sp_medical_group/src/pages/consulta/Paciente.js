import  React,{ Component } from "react";
import '../../assets/css/List.css';
import SideBar from "../../components/sideBar/SideBar";
import consultaIcon from '../../assets/icons/consulta.svg';
import moreIcon from '../../assets/icons/more.svg';
import deleteIcon from '../../assets/icons/trash_full.svg';
import editIcon from '../../assets/icons/edit.svg';
import Modal from '../../components/Modal/Modal';

class Paciente extends Component {
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
            isLoading: false,
            mensagem: ''
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
                <div className='Content'>


                    <header className='Header'>
                        <div className='tituloButton'>
                            <div className='tituloIcon'>
                                <figure>
                                    <img src={consultaIcon} alt='Icone de pacientes' />
                                </figure>
                                <p>Minhas consultas ()</p>
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
                                                <button><img src={moreIcon} alt='Icone de mais opções' /></button>
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

export default Paciente;