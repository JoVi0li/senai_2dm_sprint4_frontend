import { Component } from "react";
import '../../../assets/css/dashbord/Geral.css'
import SideBar from "../../../components/SideBar";

class Geral extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };



    componentDidMount(){

    };



    render(){
        return(
            <body className="Geral-body">
                <SideBar/>
                
                <main className="Geral-main Flex-wrap">
                    <div className="Geral-card">
                        <h1>Próximas consultas</h1>
                        <ul>
                            <li><p></p></li>
                        </ul>
                    </div>
                    <div className="Geral-card">
                        <h1>Pacientes</h1>
                        <ul>
                            <li><p></p></li>
                        </ul>
                    </div>
                    <div className="Geral-card">
                        <h1>Médicos</h1>
                        <ul>
                            <li><p></p></li>
                        </ul>
                    </div>
                    <div className="Geral-card">
                        <h1>Clínicas</h1>
                        <ul>
                            <li><p></p></li>
                        </ul>
                    </div>
                </main>
            </body>
        );
    }
}

export default Geral