import { Component } from "react";
import logo from './logo.svg';
import './App.css';

class BuscarRepositorio extends Component{
  constructor(props){
      super(props);
      this.state = {
          listaDeRepositorio : [],
          user : ""
      }
  }

  buscarRepo = (repositorio) =>{
      repositorio.preventDefault()
      fetch("https://api.github.com/users/"+this.state.user+"/repos?per_page=10")
      .then(resposta => resposta.json())
      .then(data => this.setState({listaDeRepositorio : data}))
      .catch(erro => console.log(erro))
  }

  atualizarEstadoUser = (event) => {
    this.setState({user : event.target.value})
    console.log(this.state.user)
  }
  

  render(){
    return(
      <div className="App">
        <main className="App-header">
   

        <img src={logo} className="App-logo" alt="logo" />

        <p>Buscador de repositórios</p>

        <form onSubmit={this.buscarRepo} className="App-form">
          <input className="App-input" type="text" value={this.state.user} placeholder="Digite o nome  de usuário desejado" onChange={this.atualizarEstadoUser}></input>
          <button className="App-button" type="submit" >Buscar</button>
        </form>

        <table className="App-table">

          <thead className="App-table-Thead">
            <tr className="App-table-tr">
              <th className="App-table-th">Id</th>
              <th className="App-table-th">Name</th>
              <th className="App-table-th">Descrição</th>
              <th className="App-table-th">Data de criação</th>
              <th className="App-table-th">Size</th>
            </tr>
          </thead>
          <tbody className="App-table-Tbody">

          {
            this.state.listaDeRepositorio.map((repo) => {
              return(
                      <tr id={repo.id} className="App-table-tr">
                        <td className="App-table-td">{repo.id}</td>
                        <td className="App-table-td">{repo.name}</td>
                        <td className="App-table-td">{repo.description}</td>
                        <td className="App-table-td">{repo.created_at}</td>
                        <td className="App-table-td">{repo.size}</td>
                      </tr>
              )
            })
          }
          </tbody>
        </table>
      </main>
    </div>
    )
  }

}

function App() {
  return (
    <BuscarRepositorio/>
  );
}

export default App;
