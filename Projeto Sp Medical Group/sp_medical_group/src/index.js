import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './pages/home/App';
import Sobre from './pages/sobre/Sobre';
import Serviços from './pages/servicos/Servicos';
import Clinicas from './pages/clinicas/Clinicas';
import Login from './pages/login/Login';
import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/sobre" component={Sobre}/>
      <Route path="/servicos" component={Serviços}/>
      <Route path="/clinicas" component={Clinicas}/>
      <Route path="/login" component={Login}/>
      <Redirect to="/"/>
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root')
);

reportWebVitals();
