import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './pages/home/App';
import Login from './pages/login/Login'
import Home from './pages/dashbordHome/Home'
import Paciente from './pages/dashbordPaciente/Paciente';
import Medico from './pages/dashbordMedico/Medico';
import Clinica from './pages/dashbordClinica/Clinica';
import Consulta from './pages/dashbordConsulta/Consulta';
import reportWebVitals from './reportWebVitals';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route exact path='/dashbord' component={Home}/>
        <Route path='/dashbord/pacientes' component={Paciente}/>
        <Route path='/dashbord/medicos' component={Medico}/>
        <Route path='/dashbord/clinicas' component={Clinica}/>
        <Route path='/dashbord/consultas' component={Consulta}/>
        <Redirect to='/' />
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
