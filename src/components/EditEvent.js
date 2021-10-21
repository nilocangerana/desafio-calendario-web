import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";

class EditEvent extends Component {
  constructor(){
    super()
    this.state ={
        descricao:'',
        dataInicio:'',
        dataFim:'',
        usuario:localStorage.getItem('usuarioLogado')
    }
    this.changeDescricao = this.changeDescricao.bind(this)
    this.changeDataInicio = this.changeDataInicio.bind(this)
    this.changeDataFim = this.changeDataFim.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checarData = this.checarData.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.formatDataString = this.formatDataString.bind(this)
}
changeDescricao(event){
  this.setState({
      descricao:event.target.value
  })
}

changeDataInicio(event){
  this.setState({
      dataInicio:event.target.value
  })
}

changeDataFim(event){
  this.setState({
      dataFim:event.target.value
  })
}

checarData(stringDataInicio, stringDataFim){
    var dataInicio = new Date(stringDataInicio)
    var dataFim = new Date(stringDataFim)

    if(dataFim - dataInicio<=0){ //checa se data de fim é menor que data de inicio
        return true; //retorna true se fim for menor
    }
}

formatDataString(dataString){
  const d = new Date(dataString)
  return d.getUTCDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" - "+(d.getUTCHours()<10?'0':'') + d.getUTCHours()+":"+(d.getMinutes()<10?'0':'') + d.getMinutes()
}

handleLoad() {
  axios.get('http://localhost:4000/app/getEvent/'+this.props.match.params.id)
      .then(response => {
        this.setState({ descricao:response.data.descricao,  
                        dataInicio:response.data.dataInicio,
                        dataFim:response.data.dataFim});
      })
}

componentDidMount() {
  this.handleLoad();
}

onSubmit(event){
  event.preventDefault()

  //checar data
  if(this.checarData(this.state.dataInicio, this.state.dataFim))
  {
    alert("Datas inválidas, a data de fim deve ser posterior à data de início.")
  }
  else
  {
    const eventoAtualizado = {
      descricao: this.state.descricao,
      dataInicio: this.state.dataInicio+'Z',
      dataFim: this.state.dataFim+'Z',
      usuario: this.state.usuario
    }

    axios.put('http://localhost:4000/app/updateEvent/'+this.props.match.params.id, eventoAtualizado)
      .then(response => {
        if(response.data=="1"){
          alert('Evento atualizado com sucesso.');
          window.location = '/visualizarEventos'
        }
        else
        {
          if(response.data=="0")
          {
            alert('Erro na atualização do novo evento.');
          }
          else
          {
            alert(response.data.errorMsg+"\n\n"+"Evento Agendado:\nDescrição: "+response.data.errorEvent.descricao+
            "\nInício: "+this.formatDataString(response.data.errorEvent.dataInicio)+
            "\nTérmino: "+this.formatDataString(response.data.errorEvent.dataFim))
          }
        }
      })

  }
}

render(){
  return (
    <div className="createUserPage">
      <form onSubmit={this.onSubmit}>
        <div className="inner-form">
            <h2>Editar evento</h2>
              <div className="form-style">
                  <label htmlFor="descricao">Descrição:</label>
                  <input type="text" name="descricao" id="descricao" onChange={this.changeDescricao} value={this.state.descricao}/>
              </div>
              <div className="form-style">
                  <label htmlFor="dataInicio">Data/Hora de Início:</label>
                  <input type="datetime-local" name="dataInicio" id="dataInicio" onChange={this.changeDataInicio} value={this.state.dataInicio}/>
              </div>
              <div className="form-style">
                  <label htmlFor="dataFim">Data/Hora de Término:</label>
                  <input type="datetime-local" name="dataFim" id="dataFim" onChange={this.changeDataFim} value={this.state.dataFim}/>
              </div>
              <input type="submit" value="Atualizar" />
        </div>
      </form>

      <Link style={{textDecoration:"none"}} to='/visualizarEventos'><button className="back-btn">Voltar</button></Link>
    </div>
  );
}
}

export default withRouter(EditEvent);
