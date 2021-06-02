import { Component } from 'react';
import './App.css';


class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      date : new Date()
    };
  }
  
  componentDidMount(){
    this.TimerId = setInterval( () => {
      this.thick()
    }, 1000)
    console.log(this.TimerId)
  }
  
  componentWillUnmount(){
    clearInterval(this.TimerId)
  }
  
  thick(){
    this.setState({
      date : new Date()
    })
  }

  stop(){
    clearInterval(this.TimerId)
    console.log("Relógio " + this.TimerId + " pausado")
  }

  run(){
    setInterval( () => {
      this.thick()
    }, 1000)
    console.log("Relógio retomado")
    console.log("Agora eu sou o relógio " + this.TimerId)
  }
  
  render(){
    return(
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date}/>
        <button className="button button-stop" type="button" onClick={() => this.stop()}>Parar o relógio</button>
        <button className="button button-run" type="button" onClick={() => this.run()}>Retomar o relógio</button>
      </div>
    )
  }
}

function DataFormatada(props){
  return <h2>Horário atual: {props.date.toLocaleTimeString()}</h2>
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock/>
        <Clock/>
      </header>
    </div>
  );
}

export default App;
