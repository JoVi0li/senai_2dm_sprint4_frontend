import { Component } from "react";
import paciente from '../assets/icon/dashbord/paciente.svg';
import add from '../assets/icon/dashbord/add.svg';
import '../assets/css/dashbord/Header.css';

class Dashbord_Header extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <header className="Dashbord-Header-header">
            <div className="Dashbord-Header-text-icon">
                <img src={paciente} alt="Icon de pacientes"/>
                <h1>Lista de Pacientes</h1>
            </div>

            <figure className="Dashbord-Header-figure">
                <img src={add} alt=""/>
            </figure>

            <div className="Dashbord-Header-header-infos">
                <div className="Dashbord-Header-count">
                <span>7</span>
                <h1>Pacientes</h1>
                </div>
                <div className="Dashbord-Header-view-options">
                    <form className="Dashbord-Header-form">
                        <label>Listar por: </label>
                        <select className="Dashbord-Header-select">
                            <option>Ordem padrão</option>
                        </select>
                    </form>
                    

                </div>
            </div>
        </header>

        )
    }
}

export default Dashbord_Header;