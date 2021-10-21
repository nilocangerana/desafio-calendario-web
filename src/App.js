import React, {Component} from 'react';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import Menu from './components/Menu';
import CreateEvent from './components/CreateEvent';
import EventsList from './components/EventsList';
import EditEvent from './components/EditEvent';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor(){
    super()
    this.state ={
          username:'n',
          password:'n'
    }

}

logout(){
  localStorage.setItem('usuarioLogado',"");
  window.location = '/'
}

  render(){
  return (
    <BrowserRouter>
        <div className="App">
          <div className="page-header">
              <h1>Sistema de Calendário</h1>
          </div>
          <div className="userLoginMsg">{(localStorage.getItem('usuarioLogado')!="") ? (<div> <h4>Usuário Logado: {localStorage.getItem('usuarioLogado')}</h4>
            <button onClick={this.logout} id="logout-btn">Sair</button>
            <Switch>
              <Route path='/' exact> <Menu /> </Route>
              <Route path='/criarEvento'> <CreateEvent /> </Route>
              <Route path='/visualizarEventos'> <EventsList /> </Route>
              <Route path='/editarEvento/:id'> <EditEvent /> </Route>
            </Switch>
            </div>
            
          ) : (<Switch>
            <Route path='/' exact> <Home /> </Route>
            <Route path='/criarUsuario'> <CreateUser /> </Route>
            <Route path="/login"> <Login /> </Route>
          </Switch>)}</div>
        </div>
    </BrowserRouter>


  );
 }
}

export default App;
