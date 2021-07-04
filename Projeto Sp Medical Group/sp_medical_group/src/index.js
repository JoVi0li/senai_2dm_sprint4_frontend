import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt, userAutenticado } from './services/Auth';
import './index.css';
import App from './pages/home/App';
import Login from './pages/login/Login'
import Home from './pages/dashbordHome/Home'
import Paciente from './pages/dashbordPaciente/Paciente';
import Medico from './pages/dashbordMedico/Medico';
import Clinica from './pages/dashbordClinica/Clinica';
import Consulta from './pages/dashbordConsulta/Consulta';
import ConsultaPaciente from './pages/consulta/Paciente';
import ConsultaMedico from './pages/consulta/Medico';
import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component : Component  }) => (
  <Route 
    render = { props =>
      userAutenticado() && parseJwt().Role === "1" ? 
      <Component {... props} /> : 
      <Redirect to = '/login' />
    }
  />
);

const PermissaoMedico = ({ component : Component  }) => (
  <Route 
    render = { props =>
      userAutenticado() && parseJwt().Role === "2" ? 
      <Component {... props} /> : 
      <Redirect to = '/login' />
    }
  />
);


const PermissaoPaciente = ({ component : Component  }) => (
  <Route 
    render = { props =>
      userAutenticado() && parseJwt().Role === "3" ? 
      <Component {... props} /> : 
      <Redirect to = '/login' />
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <PermissaoAdm exact path='/dashbord' component={Home} />
        <PermissaoAdm path='/dashbord/pacientes' component={Paciente} />
        <PermissaoAdm path='/dashbord/medicos' component={Medico} />
        <PermissaoAdm path='/dashbord/clinicas' component={Clinica} />
        <PermissaoAdm path='/dashbord/consultas' component={Consulta} />
        <PermissaoPaciente path='/consultas/Paciente' component={ConsultaPaciente} />
        <PermissaoMedico path='/consultas/Medico' component={ConsultaMedico} />
        <Redirect to='/' component={App} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(

  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
