import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
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

  axios.get('http://localhost:4000/app/loginUser/'+this.state.username+"/"+this.state.password)
      .then(response => {
        if(response.data.existe=="1"){
          localStorage.setItem('usuarioLogado', response.data.username);
          //window.location.reload(false);
          window.location = '/'
        }
        else
        {
          alert('Nome de usuário ou senha incorretos.')
        }
      })
}

  render() {
    return (
    <div className="createUserPage">
      <form onSubmit={this.onSubmit}>
        <div className="inner-form">
            <h2>Realizar Login</h2>
              <div className="form-style">
                  <label htmlFor="username">Nome de Usuário:</label>
                  <input type="text" name="username" id="nome" onChange={this.changeUsername} value={this.state.username}/>
              </div>
              <div className="form-style">
                  <label htmlFor="password">Senha:</label>
                  <input type="password" name="password" id="senha" onChange={this.changePassword} value={this.state.password}/>
              </div>
              <input type="submit" value="Entrar" />
        </div>
      </form>

      <Link style={{textDecoration:"none"}} to='/'><button className="back-btn">Voltar</button></Link>
    </div>

    )
  }
}

export default Login;