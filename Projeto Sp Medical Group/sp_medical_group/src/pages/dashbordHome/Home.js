import { Component } from "react";
import '../../assets/css/Home.css'
import SideBar from "../../components/sideBar/SideBar";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className='homeBody'>
                <SideBar/>
                <main className='homeMain'>
                    <div className='homeCard'>
                        <div className='homeCardTitulo'>
                            <h2>Próximas consultas</h2>
                        </div>
                        <div className='homeCardInfos'>

                        </div>
                    </div>
                    <div className='homeCard'>
                        <div className='homeCardTitulo'>
                            <h2>Últimas consultas</h2>
                        </div>
                        <div className='homeCardInfos'>

                        </div>
                    </div>
                    <div className='homeCard'>
                        <div className='homeCardTitulo'>
                            <h2>Pacientes</h2>
                        </div>
                        <div className='homeCardInfos'>

                        </div>
                    </div>
                    <div className='homeCard'>
                        <div className='homeCardTitulo'>
                            <h2>Médicos</h2>
                        </div>
                        <div className='homeCardInfos'>

                        </div>
                    </div>
                </main>
            </div>
        )
    }


}

export default Home;