import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateUser extends Component {
  constructor(){
    super()
    this.state ={
        username:'',
        password:''
    }
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}

changeUsername(event){
  this.setState({
      username:event.target.value
  })
}

changePassword(event){
  this.setState({
      password:event.target.value
  })
}

onSubmit(event){
  event.preventDefault()

  const novoUsuarioRegistrado = {
      username: this.state.username,
      password: this.state.password
  }

  axios.post('http://localhost:4000/app/createNewUser', novoUsuarioRegistrado)
      .then(response => {
        if(response.data=="1"){
          alert('Novo usuário criado com sucesso.');
          window.location = '/'
        }
        else
        {
          alert('Erro na criação de usuário, nome de usuário já existe.')
        }
      })
}

render(){
  return (
    <div className="createUserPage">
      <form onSubmit={this.onSubmit}>
        <div className="inner-form">
            <h2>Criar novo usuário</h2>
              <div className="form-style">
                  <label htmlFor="username">Nome de Usuário:</label>
                  <input type="text" name="username" id="username" onChange={this.changeUsername} value={this.state.username}/>
              </div>
              <div className="form-style">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" name="password" id="password" onChange={this.changePassword} value={this.state.password}/>
              </div>
              <input type="submit" value="Criar Usuário" />
        </div>
      </form>

      <Link style={{textDecoration:"none"}} to='/'><button className="back-btn">Voltar</button></Link>
    </div>
  );
}
}

export default CreateUser;
