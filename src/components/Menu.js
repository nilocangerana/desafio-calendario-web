import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {

render () {
  return (
    <div className="homeListDiv">
        <ul className="homeList">
          <Link style={{textDecoration:"none"}} to='/criarEvento'><li>Adicionar Evento</li></Link>
          <Link style={{textDecoration:"none"}} to='/visualizarEventos'><li>Visualizar Eventos</li></Link>
        </ul>
    </div>

  );

  }
}

export default Menu;