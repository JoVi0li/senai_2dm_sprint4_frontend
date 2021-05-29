import { Component } from "react";
import './App.css';
import editIcon from '../../icons/edit.svg'
import deleteIcon from '../../icons/delete.svg'
import loginIcon from '../../icons/login.svg';


class ListaDesejos extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaDesejos : [],
            desejo : ''
        }
    }

    buscarDesejos = () => {
        fetch('http://localhost:5000/api/Desejo')
        .then(resposta => resposta.json())
        .then(data => this.setState({listaDesejos : data}))
        .catch((erro) => console.log(erro))
        
        
    }

    atualizarEstadoDesejo = (event) => {
        this.setState({desejo : event.target.value})
    }

    cadastrarDesejos = (desejo) => {
        desejo.preventDefault();

        fetch('http://localhost:5000/api/Desejo', {

            method : 'POST',
            body : JSON.stringify({desejo : this.state.desejo}),
            headers : {
                "Content-type" : "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(console.log("cadastrado"))
        .catch(error => console.log(error))
        .then(this.buscarDesejos)
    }
    

    componentDidMount(){
        this.buscarDesejos();
    }

    render(){
        return(
            <div>
            <header className="header flex-center">
              <h1 className="title">WishList</h1>
            </header>
            <main className="flex-center">
      
              <div className="login flex-center-bt">
                <h2>Olá!</h2>
                <a href="Login">
                  <figure>
                    <img src={loginIcon} alt="Ícone de login"/>
                  </figure>
                </a>
              </div>
      
              <div className="inputs flex-center-bt">
                <form onSubmit={this.cadastrarDesejos} className="register">
                  <input className="input-register border" type="text" value={this.state.desejo} onChange={this.atualizarEstadoDesejo} placeholder="Faça seu desejo"/>
                  <button className="button-submit border" type="submit" >Cadastrar</button>
                </form>
                <form className="order">
                  <label>Ordenar por:</label>
                  <select className="form-select">
                    <option >Mais recentes</option>
                    <option>Mais antigos</option>
                  </select>
                </form>
              </div>
              <div className="table-content  border">
          <div className="table-title">
            <h2>Lista de Desejos</h2>
          </div>
          <table className="table">
            <tbody className="table-body">
                {
                    this.state.listaDesejos.map((desejo) => {
                        return(
                            <tr className="table-row flex-center" key={desejo.idDesejo}>
                                <th className="table-Id flex-center">{desejo.idDesejo}</th>
                                <th className="table-desejo flex-center">{desejo.descricao}</th>
                                <th className="table-data flex-center"></th>
                                <th className="table-edit flex-center"><img src={editIcon} alt="Ícone de edição"/></th>
                                <th className="table-delete flex-center"><img src={deleteIcon} alt="Ícone de exclusão"/></th>
                            </tr>
                        )
                    })

                }
            </tbody>
          </table>
        </div>

            </main>
          </div>   
  
        );
    }
}

export default ListaDesejos;