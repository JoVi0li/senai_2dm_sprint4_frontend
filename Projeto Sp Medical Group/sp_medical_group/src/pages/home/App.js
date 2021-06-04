import { Component } from 'react';
import '../../assets/css/App.css';
import logo  from '../../assets/icon/logo.svg'
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
          <div className="App-text">

          </div>
          <div className="App-ilustration">

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
