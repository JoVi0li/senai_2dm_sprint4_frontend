import { Component } from "react";
import SideBar from "../../../components/SideBar";
import '../../../assets/css/dashbord/Paciente.css'
import Dashbord_Header from "../../../components/Dashbord_Header";

class Paciente extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }




    render(){
        return(
            <body className="Paciente-body">
                <SideBar/>
                <main>
                    <Dashbord_Header/>
                </main>
            </body>
        )
    }
}


export default Paciente;