import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EventList extends Component {
  constructor(){
    super()
    this.state={
        lista:[{"dataFim":"", "dataInicio":"", "descricao":"", "usuario":""}]
    };
    this.handleLoad = this.handleLoad.bind(this)
    this.formatDataString = this.formatDataString.bind(this)
    this.onDelete = this.onDelete.bind(this)
}

 handleLoad() {
    axios.get('http://localhost:4000/app/getEventList/'+localStorage.getItem('usuarioLogado'))
        .then(response => {
          this.setState({ lista: response.data });
        })
  }

  componentDidMount() {
    this.handleLoad();
  }

  formatDataString(dataString){
    const d = new Date(dataString)
    return d.getUTCDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" - "+(d.getUTCHours()<10?'0':'') + d.getUTCHours()+":"+(d.getMinutes()<10?'0':'') + d.getMinutes()
}

onDelete(event){
  event.preventDefault()

  axios.delete('http://localhost:4000/app/deleteEvent/'+event.target.value)
      .then(response => {
        if(response.data=="1"){
          alert('Evento deletado com sucesso.');
          window.location.reload(false);
        }
        else
        {
          alert('Erro ao deletar evento.')
        }
      })
}

render(){
  return (
    <div className="eventListPage">
        <div className="inner-form">
            <h2>Lista de eventos</h2>
              <div className="events-div">
              <table className="eventsTable">
                <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Data Início</th>
                    <th>Data Término</th>
                    <th>Editar</th>
                    <th>Deletar</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.state.lista.map((item, index) => (
                            <tr key={index}>
                                <td className="tableDescription">{item.descricao}</td>
                                <td>{this.formatDataString(item.dataInicio)}</td>
                                <td>{this.formatDataString(item.dataFim)}</td>
                                <td><Link style={{textDecoration:"none"}} to={`/editarEvento/${item._id}`}><span className="edit-btn">Editar</span></Link></td>
                                <td><button onClick={this.onDelete} value={item._id} className="delete-btn">X</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
              </div>
        </div>

      <Link style={{textDecoration:"none"}} to='/'><button className="back-btn">Voltar</button></Link>
    </div>
  );
}
}

export default EventList;
