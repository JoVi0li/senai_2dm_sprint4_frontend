import { Component } from "react";
import '../assets/css/dashbord/Side-bar.css'
import logo from '../assets/img/logo_spmedgroup.png'
import geral from '../assets/icon/dashbord/geral.svg'
import clinica from '../assets/icon/dashbord/clinica.svg'
import consulta from '../assets/icon/dashbord/consulta.svg'
import medico from '../assets/icon/dashbord/medico.svg'
import paciente from '../assets/icon/dashbord/paciente.svg'
import user from '../assets/icon/dashbord/user.svg'


class SideBar extends Component{
    render(){
        return(
            <div className="Side-bar Flex-column-around">
            <figure className="Logo">
                <img  src={logo} alt="Logo Sp Medical Group" width="100" height="100" />
            </figure>


            <nav className="Navegacao">
                <ul className="Flex-column-between">
                    <li>
                        <img src={geral} />
                        <a href="dashbord" >Geral</a>
                    </li>
                    <li>
                        <img src={paciente} />
                        <a href="dashbord" >Pacientes</a>
                    </li>
                    <li>
                        <img src={medico} />
                        <a href="dashbord" >Médicos</a>
                    </li>
                    <li>
                        <img src={consulta} />
                        <a href="dashbord" >Consultas</a>
                    </li>
                    <li>
                        <img src={clinica} />
                        <a href="dashbord" >Clínicas</a>
                    </li>
                </ul>
            </nav>

            <div className="User">
                <img src={user} />
                <p>João Vitor</p>
            </div>
        </div>

        )
    }
}

export default SideBar;