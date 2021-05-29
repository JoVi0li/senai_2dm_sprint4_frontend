import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import './index.css';
import ListaDesejos from './pages/home/lista_de_desejos';
import Login from './pages/login/login'
import reportWebVitals from './reportWebVitals';


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path = "/" component={ListaDesejos}/>
        <Route path = "/login" component={Login}/>
        <Redirect to = "/" />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing,document.getElementById('root'));

reportWebVitals();
