import { Component } from 'react';
import '../../assets/css/App.css';
import ilustration from '../../assets/img/ilustrationHome.svg'
import Header from '../../components/header/Header'

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <body>
        <Header/>
        <main className="App-main">
          <div className="App-text Flex-center">
            <div className="App-h1-p ">
              <h1>Sp Medical Group</h1>
              <p>Somos uma nova clínica médica de pequeno porte,
                fundada pelo médico Fernando Strada em 2020 na região da Paulista em São Paulo.
                Contamos com uma equipe de médicos que atuam em diversas áreas 
                (pediatria, odontologia, gastrenterologia etc.).
              </p>
            </div>
          <div>
          </div>
            <a className="App-a-login" href="Sobre">Saiba mais</a>
          </div>
          <div className="App-ilustration">
            <img src={ilustration} alt="Ilustração de uma médica"/>
          </div>
        </main>
      </body>
    )
  }
}


function App() {
  return (
   <Home/>
  );
}

export default App;
